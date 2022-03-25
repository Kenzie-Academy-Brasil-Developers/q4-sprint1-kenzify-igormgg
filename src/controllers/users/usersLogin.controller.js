var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtTokenExpiration, userDB } from '../../configs';
const usersLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = userDB.find((usr) => usr.username === data.username);
    if (!user) {
        return res.status(401).json({ message: 'Wrong credentials. Try again!' });
    }
    const match = yield bcrypt.compare(data.password, user.password);
    if (!match) {
        return res.status(401).json({ message: 'Wrong credentials. Try again!' });
    }
    const token = jwt.sign({
        username: data.username,
        password: user.password,
    }, jwtSecret, { expiresIn: jwtTokenExpiration });
    return res.status(200).json({ accessToken: token });
});
export default usersLoginController;
