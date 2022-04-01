import { Response } from 'express';

import { userDB } from '../../configs';
import * as types from '../../typings/createdTypes';

const deleteSongController = (req: any, res: Response) => {
  const { userAuthenticated } = req;

  const user: types.userType | undefined = userDB.find(
    (usr) => userAuthenticated.username === usr.username
  );

  const { artist } = req.query;
  const { song } = req.query;

  const capitalizedSong = song
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const artistPlaylist: any = user?.playlist[artist];

  const foundSong = artistPlaylist.find(
    (music: types.playlistType) => music.title === capitalizedSong
  );

  if (foundSong) {
    const songIndex: number = artistPlaylist.indexOf(foundSong);
    artistPlaylist.splice(songIndex, 1);

    res.status(204).json('');
  } else {
    res.status(404).json({ error: `song ${song} not found` });
  }
};

export default deleteSongController;
