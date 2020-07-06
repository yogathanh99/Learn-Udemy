import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer 2RadtzgzO3tSR5Ptg-5u7KDDU-7I_PvHjFjBfRFWvPQmLg0DDwfS7IY_O1xhD7XBtzyXW8X6LW9j7JXYSymhHP0x8BdUiS20UeaY0IvwEFgKAwxZNhK2nbns8zOaXXYx',
  },
});
