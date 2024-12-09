 const notFound = (req, res)=>{
    return res.status(404).json({error: "Route Does't Exists"})
}

export default notFound