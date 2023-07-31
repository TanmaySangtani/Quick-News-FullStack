var axios = require("axios")

const addGeneralNews = async () => {
    try {
      const newsAPI = await axios.get(`http://api.mediastack.com/v1/news?access_key=f5f3d763e85858c01b75e2df796d4dfc&countries=au,-us`)

      console.log(newsAPI.data.data[0].title)
    } catch (err) {
      console.log(err)
    }
}

module.exports = addGeneralNews