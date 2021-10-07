const Account = require('../models/taikhoan');
const Notification = require('../models/thongbao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    // [POST] /auth/register
    async registerPost (req, res) {
        const { email, password, fullname } = req.body;

        const found = await Account.findByEmail(email);
        if(!found)
        {
            try {
                var hash = bcrypt.hashSync(password, 10);
                var dayNow = new Date();

                await Account.create({
                    email: email,
                    password: hash,
                    fullname: fullname,
                    role: 'user',
                });

                const idEmail = await Account.findByEmail(email);
                Notification.create({
                    massage: `Chào mừng <span>${fullname}</span> đến với A Store! Bầy giờ bạn có thể mua sắm thả ga trên A-STORE <3`,
                    type: 'Welcome',
                    img: '',
                    id_user: idEmail.id_user,
                    status: 1,
                    time: dayNow,
                })
    
                res.json('success');
            }
            catch(err)
            {
                res.json(err);
            }
        }
        else {
            res.json('Email already exists!');
        }
    }
   
    // [POST] /auth/login
    async loginPost (req, res) {
        const { email , password } = req.body;
     
        const found = await Account.findByEmail(email);
      
        if(found && bcrypt.compareSync(password, found.password)) {
            const user = {
                id: found.id_user,
                email: found.email,
                fullname: found.fullname,
                role: found.role,
            }

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40s' });
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

            found.refreshToken = refreshToken;
            await found.save();

            res.json({status: 'success', accessToken: accessToken, refreshToken: refreshToken, infoUser: {
                email: found.email,
                fullname: found.fullname,
                role: found.role,
            }});
        }
        else {
            res.json({status: 'Email and Password is not found!'});
        }
    }

    // [POST] /auth/refresh-token
    async refreshToken (req, res) {
        const { refreshToken } = req.body;
        if(!refreshToken) return res.sendStatus(401);
        const isuser = await Account.findByRefreshToken(refreshToken);
        if(!isuser) res.sendStatus(403); 
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

           
            const user = {
                id: isuser.id_user,
                email: isuser.email,
                fullname: isuser.fullname,
                role: isuser.role,
            }
            
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40s' });
            const _refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

            isuser.refreshToken = _refreshToken;
            await isuser.save();
            
            res.json({status: 'success', accessToken: accessToken, refreshToken: _refreshToken});
        } catch (error) {
            console.log(error);
            return res.sendStatus(401);
        }
    }
}



module.exports = new AuthController