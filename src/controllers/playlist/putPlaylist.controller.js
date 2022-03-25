/* eslint no-restricted-syntax: 0 */
import { userDB } from '../../configs';
const putPlaylistController = (req, res) => {
    const data = req.body;
    const { userAuthenticated } = req;
    const user = userDB.find((usr) => userAuthenticated.username === usr.username);
    if (Object.keys(data).length) {
        const dataEntries = Object.entries(data);
        for (const [key, value] of dataEntries) {
            const capitalizedTitle = value[0].title
                .toLowerCase()
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            value[0].title = capitalizedTitle;
            value[0].listenedByMe = 0;
            if (user) {
                const playKey = user.playlist[key];
                if (playKey) {
                    playKey.push(value);
                }
                else {
                    user.playlist[key] = value;
                }
            }
        }
        res.status(200).json(user);
    }
    else {
        const { artist } = req.query;
        const { song } = req.query;
        const capitalizedSong = song
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        const artistPlaylist = user === null || user === void 0 ? void 0 : user.playlist[artist];
        const foundSong = artistPlaylist.find((music) => music.title === capitalizedSong);
        if (foundSong) {
            foundSong.listenedByMe += 1;
            res.status(200).json(foundSong);
        }
        else {
            res.status(404).json({ error: `song ${song} not found` });
        }
    }
};
export default putPlaylistController;
