const express = require('express')
const router = express.Router()
const ArticleSchema = require('../models/Article')
const UserSchema = require('../models/User')
const fetchuser = require('../middleware/fetchUser')
const UserArticleSchema = require('../models/UserArticle')

router.post('/addarticle', (req, res)=>{
    const article = ArticleSchema(req.body)
    article.save()
    res.send(req.body)
})

router.get('/fetcharticle', async (req, res)=>{
    const totalResults = await ArticleSchema.find({category: req.query.category}).count()
    const arts = await ArticleSchema.find({category: req.query.category}).sort({ publishedAt: -1 }).limit(req.query.pageSize*req.query.page).exec()

    // console.log(arts)
    res.json({totalResults: totalResults, articles: arts})
})

router.post('/like', fetchuser, async (req, res) => {
    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id
        const articleId = req.body.articleId

        const check = (id) => {
            return id === articleId
        }
    
        const user = await UserSchema.findOne({_id: userId})
        if (user.likedArticles.find(check)) {
            res.json({success: true})
        } else {
            await UserSchema.updateOne({_id: userId}, {$push: {likedArticles: articleId}})
            await ArticleSchema.updateOne({_id: articleId}, {$inc: {likeCount: 1}})

            res.json({success: true})
        }
    }
})

router.post('/removelike', fetchuser, async(req, res) => {
    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id
        const articleId = req.body.articleId

        const check = (id) => {
            return id === articleId
        }

        const user = await UserSchema.findOne({_id: userId})

        if (user.likedArticles.find(check)) {
            await UserSchema.updateOne({_id: userId}, {$pull: {likedArticles: articleId}})
            await ArticleSchema.updateOne({_id: articleId}, {$inc: {likeCount: -1}})

            res.json({success: true})
        } else {
            res.json({success: true})
        }
    }
})

router.post('/dislike', fetchuser, async(req, res) => {
    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id
        const articleId = req.body.articleId

        const check = (id) => {
            return id === articleId
        }
    
        const user = await UserSchema.findOne({_id: userId})
        if (user.dislikedArticles.find(check)) {
            res.json({success: true})
        } else {
            await UserSchema.updateOne({_id: userId}, {$push: {dislikedArticles: articleId}})
            await ArticleSchema.updateOne({_id: articleId}, {$inc: {dislikeCount: 1}})

            res.json({success: true})
        }
    }
})

router.post('/removedislike', fetchuser, async(req, res) => {
    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id
        const articleId = req.body.articleId

        const check = (id) => {
            return id === articleId
        }

        const user = await UserSchema.findOne({_id: userId})

        if (user.dislikedArticles.find(check)) {
            await UserSchema.updateOne({_id: userId}, {$pull: {dislikedArticles: articleId}})
            await ArticleSchema.updateOne({_id: articleId}, {$inc: {dislikeCount: -1}})

            res.json({success: true})
        } else {
            res.json({success: true})
        }
    }
})

router.post('/save', fetchuser, async(req, res) => {
    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id
        const articleId = req.body.articleId

        const check = (id) => {
            return id === articleId
        }
    
        const user = await UserSchema.findOne({_id: userId})
        if (user.savedArticles.find(check)) {
            res.json({success: true})
        } else {
            await UserSchema.updateOne({_id: userId}, {$push: {savedArticles: articleId}})

            res.json({success: true})
        }
    }
})

router.post('/removesave', fetchuser, async(req, res) => {
    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id
        const articleId = req.body.articleId

        const check = (id) => {
            return id === articleId
        }

        const user = await UserSchema.findOne({_id: userId})

        if (user.savedArticles.find(check)) {
            await UserSchema.updateOne({_id: userId}, {$pull: {savedArticles: articleId}})

            res.json({success: true})
        } else {
            res.json({success: true})
        }
    }
})

router.get('/userarts', fetchuser, async(req, res) => {
    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id

        const user = await UserSchema.findOne({_id: userId})

        const likedArticles = user.likedArticles
        const dislikedArticles = user.dislikedArticles
        const savedArticles = user.savedArticles

        res.json({success: true, likedArticles: likedArticles, dislikedArticles: dislikedArticles, savedArticles: savedArticles})
    }
})

router.post('/saveuserarticle', fetchuser, async(req,res)=> {

    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id

        let data = {...req.body.data}
        const articleId = req.body.id

        // console.log(articleId)

        data["userid"] = userId

        if (articleId === 'none') {
            const art = await UserArticleSchema.create(data)

            res.json({success: true, articleId: art._id})
        } else {
            const res1 = await UserArticleSchema.updateOne({_id: articleId}, {$set: {title: data.title, dateupdated: data.dateupdated, author: data.author, articleData: data.articleData}})

            if (res1 === null) {
                res.json({success: false})
            } else {
                res.json({success: true, articleId: articleId})   
            }
        }        
    }
})

router.post('/publishuserarticle', fetchuser, async(req,res)=> {

    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id

        let data = {...req.body.data}
        const articleId = req.body.id

        data["userid"] = userId

        if (articleId === 'none') {
            res.json({success: false})
        } else {
            const res1 = await UserArticleSchema.updateOne({_id: articleId}, {$set: {title: data.title, dateupdated: data.dateupdated, author: data.author, articleData: data.articleData, isPublished: true}})

            if (res1 === null) {
                res.json({success: false})
            } else {
                res.json({success: true, articleId: articleId})   
            }
        }        
    }
})

router.get('/getcreatedarticle', fetchuser, async(req,res)=>{
    if (req.user === "!"){
        res.json({success: false})
    } else {
        const userId = req.user.id
        const articleId = req.params.cartid
        
        const user = await UserSchema.findOne({_id: userId})
    }
})

router.get('/fetchlikedarticles', fetchuser, async(req,res)=>{
    if (req.user === "!"){
        res.json({success: false})
    } else {
        const userId = req.user.id
        
        const user = await UserSchema.findOne({_id: userId})
        const arr = user.likedArticles

        const articleArray = await ArticleSchema.find({ _id: { $in: arr } })

        res.json({success: true, articles: articleArray})
    }
})

router.get('/fetchsavedarticles', fetchuser, async(req,res)=>{
    if (req.user === "!"){
        res.json({success: false})
    } else {
        const userId = req.user.id
        
        const user = await UserSchema.findOne({_id: userId})
        const arr = user.savedArticles

        const articleArray = await ArticleSchema.find({ _id: { $in: arr } })

        res.json({success: true, articles: articleArray})
    }
})

router.get('/fetchoneuserarticle', async (req,res)=>{

    const art = await UserArticleSchema.findOne({_id: req.query.id})

    res.json({article: art})
})

router.get('/townsquarearticles', async(req,res)=>{
    const arts = await UserArticleSchema.find({isPublished: true})

    res.json(arts)
})

module.exports = router