const jobs = require('../config/jobs.json');

module.exports.home = async function(req, res){
    return res.render('jobs', {
        title: "Placement Portal| Jobs",
        jobs: JSON.stringify(jobs)
    })
}