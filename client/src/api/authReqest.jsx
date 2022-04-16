import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/v1' : '';

export default axios.create({
  baseURL: URL
});
