/* eslint no-param-reassign: 0 */
import { userDB } from '../../configs';
const getUsersController = (req, res) => {
    const listUsersWithoutPassword = JSON.parse(JSON.stringify(userDB));
    listUsersWithoutPassword.forEach((usr) => delete usr.password);
    res.status(200).json(listUsersWithoutPassword);
};
export default getUsersController;
