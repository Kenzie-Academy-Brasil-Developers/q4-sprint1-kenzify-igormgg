/* eslint no-restricted-syntax: 0 */

import { Response } from 'express';

import { userDB } from '../../configs';
import * as types from '../../typings/createdTypes';

const putPlaylistController = (req: any, res: Response) => {
  const data = req.body;

  const { userAuthenticated } = req;

  const user: types.userType | undefined = userDB.find(
    (usr) => userAuthenticated.username === usr.username
  );

  if (Object.keys(data).length) {
    const dataEntries: [string, any][] = Object.entries(data);
    for (const [key, value] of dataEntries) {
      const capitalizedTitle = value[0].title
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      value[0].title = capitalizedTitle;

      value[0].listenedByMe = 0;

      if (user) {
        const playKey: any = user.playlist[key];
        if (playKey) {
          playKey.push(value);
        } else {
          user.playlist[key] = value;
        }
      }
    }

    res.status(200).json(user);
  } else {
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
      foundSong.listenedByMe += 1;

      res.status(200).json(foundSong);
    } else {
      res.status(404).json({ error: `song ${song} not found` });
    }
  }
};

export default putPlaylistController;
