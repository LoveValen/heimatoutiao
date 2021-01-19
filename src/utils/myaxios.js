import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:3000'
// });

axios.defaults.baseURL = 'http://127.0.0.1:3000'

export default axios;