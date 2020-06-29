import api from '../../service/api'
import parseLink from '../../service/parseLink'
//import parse from '../../service/parse'
//const parse = require('../../service/parse')
import parse from 'parse-link-header'

class RepositoryController {
    async index(req, res) {
        const { page = 1, page_size = 10, org = false } = req.query;
        try{
        const response = await api.get(`${org ? 'orgs' : 'users'}/${req.params.name}/repos?page=${page}&per_page=${page_size}&order=desc&sort=update`)
        var linkHeader = response.headers.link
        return res.json({data:response.data,pagination:parse(response.headers.link)})
         }
        catch{
            return res.status(400).json({error:'user or org repository is empty'})
        }

    }
    async findByName(req, res) {
        try {
            const response = await api.get(`repos/${req.params.name}/${req.params.repo}`)
            return res.json(response.data)
        }
        catch{
            return res.status(400).json({error:"repository not exist"})
        }
    }
}
export default new RepositoryController()