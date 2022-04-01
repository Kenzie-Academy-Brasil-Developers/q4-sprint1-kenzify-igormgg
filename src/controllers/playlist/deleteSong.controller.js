import { userDB } from '../../configs';
const deleteSongController = (req, res) => {
    const { userAuthenticated } = req;
    const user = userDB.find((usr) => userAuthenticated.username === usr.username);
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
        const songIndex = artistPlaylist.indexOf(foundSong);
        artistPlaylist.splice(songIndex, 1);
        res.status(204).json('');
    }
    else {
        res.status(404).json({ error: `song ${song} not found` });
    }
};
export default deleteSongController;
