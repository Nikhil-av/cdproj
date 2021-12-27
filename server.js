
const exp = require("express")
const app = exp();
const port = process.env.PORT || 3500
const path = require("path")
app.listen(port, () => console.log(`server on ${port}...`))
app.use(exp.static(path.join(__dirname, './dist/cdconcepts/')))
app.use((req, res, next) => {

    res.send({ message: `path ${req.url} is invalid` })
})

//error handling middleware
app.use((err, req, res, next) => {
    res.send({ message: `error is ${err.message}` })
})