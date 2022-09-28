/**
 * @file services/index.js
 * @author niceeggplant <351891192@qq.com>
 */
import axios from 'axios';

export const getData = () => axios.get('/api/getData');
export const publish = data => axios.post('/api/publish', data);
