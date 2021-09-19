import authApi from "api/authApi";

export const fecthRefreshToken = async () => {
    try {
        const data = {
            refreshToken: localStorage.getItem('refreshToken'),
        }
        const resultToken = await authApi.refreshToken(data);
        localStorage.setItem('accessToken', resultToken.accessToken);
        localStorage.setItem('refreshToken', resultToken.refreshToken);
    } catch(err) {
        console.log('Failed to refresh token', err);
        return err;
    }
}