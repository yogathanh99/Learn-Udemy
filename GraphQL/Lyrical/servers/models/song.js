const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: [true, 'Title must unique'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  lyrics: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Lyric',
    },
  ],
});

SongSchema.statics.addLyric = function (id, content) {
  const Lyric = mongoose.model('Lyric');

  return this.findById(id).then((song) => {
    const lyric = new Lyric({ content, song });
    song.lyrics.push(lyric);
    return Promise.all([lyric.save(), song.save()]).then(
      ([lyric, song]) => song,
    );
  });
};

SongSchema.statics.findLyrics = function (id) {
  return this.findById(id)
    .populate('lyrics')
    .then((song) => song.lyrics);
};

const Song = mongoose.model('Song', SongSchema);
module.exports = Song;
