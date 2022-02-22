import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
});

export async function getVideos(searchQuery, apiKey) {
  try {
    const { data } = await axiosClient.get(
      `search?part=snippet&maxResults=12&order=title&q=${searchQuery}&key=${apiKey}`,
    );
    return [null, data];
  } catch (error) {
    return [error];
  }
}

export async function getVideosWithStatistic(videoIds, apiKey) {
  try {
    const { data } = await axiosClient.get(
      `videos?part=snippet%2Cstatistics&id=${videoIds}&key=${apiKey}`,
    );
    return [null, data];
  } catch (error) {
    return [error];
  }
}

export async function getVideosByParameters(max, sort, value, apiKey) {
  try {
    const { data } = await axiosClient.get(
      `search?part=snippet&maxResults=${max}&order=${sort || 'relevance'}&q=${value}&key=${apiKey}`,
    );
    return [null, data];
  } catch (error) {
    return [error];
  }
}
