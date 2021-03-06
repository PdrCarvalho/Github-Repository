import * as Yup from 'yup'

import Archived from '../models/Archived'
// import Contributors from '../models/Contributors'
import api from '../../service/api'

class ArchivedController{
    async Store(req,res){
        const schema = Yup.object().shape({
            username: Yup.string().required(),
            repository_name: Yup.string().required(),
            repository_id:Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }
        const {username, repository_name, repository_id} = req.body
        const repositoryExist = await Archived.findOne({id:repository_id})
        if (repositoryExist){
            return res.status(400).json({error:'Repository has already been archived'})
        }
        try{
             let response = await api.get(`repos/${username}/${repository_name}`)
             var respository = response.data
        }
        catch{
            return res.status(400).json({error:'Repository not exist.'})
        }
        try{
            let response = await api.get(`/repos/${username}/${repository_name}/contributors`)
            var contributors = response.data
        }
        catch{
            var contributors = null
        }
        try{
            let response = await api.get(`/repos/${username}/${repository_name}/pulls?page=1&per_page=3&order=desc&sort=update&state=open`)
            var pulls = response.data
        }
        catch{
            var pulls = null
        }
        respository['contributors']= contributors
        respository['pulls']= pulls
        const archived = await Archived.create(respository)
        return res.status(201).json(archived)

    }
    async Index(req,res){
        const archived = await  Archived.find().populate('contributors').populate('pulls').sort([['createdAt',-1]])
        return res.json(archived)
    }
}

export default new ArchivedController()