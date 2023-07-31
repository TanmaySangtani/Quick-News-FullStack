const input = require('./demo.json')
const fs = require('fs')
const category = "general"

let data = []
input.forEach((item)=>{
    let tmp = {}
    tmp.title = item.title
    tmp.description = item.description
    tmp.newsUrl = item.url
    tmp.imageUrl = item.urlToImage
    tmp.source = item.source.name
    tmp.publishedAt = item.publishedAt
    tmp.category = category

    data.push(tmp)
})

const str = JSON.stringify(data)

fs.writeFile('experimentalimports.json', str, (err) => {
    if (err) throw err
})