const handleProfile = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({
        id: id
    }).then(user=>{ //empty array is also treated as true, if a user does not exist, it returns empty array
        if(user.length){
            res.json(user[0]);
        }else{
            res.status(400).json('Not Found');
        }
    }).catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
    handleProfile: handleProfile
}
