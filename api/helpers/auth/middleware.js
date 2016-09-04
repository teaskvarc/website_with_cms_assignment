'use strict';

const mongoose  = require('mongoose');
const _         = require('lodash');
const aclList   = require('../../config/acl');


module.exports = (req, res, next)=>{

    console.log('Method: ', req.method);
    console.log('Path: ', req.path);


    const AccountModel = mongoose.model('Account');

    const token = req.headers.authorization;

    AccountModel.findOne({'tokens.value':token})
        .then((doc) =>{

            const isAllowed = checkAccess(req, doc)

            if(!doc){
                next('Failed');
            }else if(isAllowed){

                //vse routes, ki bojo prejeli ta req, vsi routes, ki so za tem middleware na vrsti
                // bodo imeli pripeti dokument s katerim lahko iscejo po bazi
                req.account = doc;
                next();
            }else{
              next('Not allowed');
            }
        });
};

function checkAccess(req, accountDoc) {

    const method    = req.method.toLowerCase();
    const path      = req.path;
    const role      = accountDoc.role;
    let allowed   = false;


    //tukaj loop-amo; ce najdemo item, kateremu ustrezajo ti pogoji(method, path, role)
    _.each(aclList, (aclItem, i) =>{

        if(aclItem.role === role){

            _.each(aclItem.methods, (_method, j)=>{

                if(_method === method && path === aclItem.path){

                    allowed = true;

                }

            });
        }

    });

    return allowed;

}
