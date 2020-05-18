const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');
const mongoose = require('mongoose');

const Song = mongoose.model('Song');
const Lyric = mongoose.model('Lyric');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
      },
      async resolve(parentValue, { title }) {
        const song = await Song.create({ title });
        return song;
      },
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID },
      },
      resolve(parentValue, { content, songId }) {
        return Song.addLyric(songId, content);
      },
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Lyric.like(id);
      },
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      async resolve(parentValue, { id }) {
        const song = await Song.findByIdAndDelete(id);
        return song;
      },
    },
  },
});

module.exports = mutation;
