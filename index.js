(function () {
  // write your code here
  const BASE_URL = 'https://movie-list.alphacamp.io/'
  const INDEX_URL = BASE_URL + 'api/v1/movies'
  const POSETER_URL = BASE_URL + 'posters/'
  const data = []

  axios.get(INDEX_URL)
    .then((response => {
      //展開運算子 ... 把陣列元素展開
      data.push(...response.data.results)
      console.log(data)
    }))
    .catch((err) => console.log(err))
})()