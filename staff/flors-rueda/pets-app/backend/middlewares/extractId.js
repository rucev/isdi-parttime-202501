const extractId = (req, res, next) => {
    const auhtHeader = req.headers.authorization

    const id = auhtHeader.split(" ")[1]

    req.userId = id

    next()
}

export default extractId