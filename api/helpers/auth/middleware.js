'use strict';

const mongoose   = require('mongoose');
const _          = require('lodash');
const aclList    = require('../../config/acl');
const UrlPattern = require('url-pattern');


module.exports = (req, res, next)=>{

    console.log('Method: ', req.method);
    console.log('Path: ', req.path);


    const AccountModel = mongoose.model('Account');

    const token = req.headers.authorization;

    console.log(token);

    AccountModel.findOne({'tokens.value':token})
        .then((doc) =>{

            const isAllowed = true;//checkAccess(req, doc);

            if(!doc){
                console.log('Failed');
                next('Failed');
            }else if(isAllowed){

                //vse routes, ki bojo prejeli ta req, vsi routes, ki so za tem middleware na vrsti
                // bodo imeli pripeti dokument s katerim lahko iscejo po bazi
                req.account = doc;
                next();
            }else{
              next('Not allowed');
            }
        })
        .catch((err)=>{
            next('Not allowed');
        });
};

/**
 * Method that checks if the account has permission to request this resource with this method
 * @param req expects the request to check method, and path
 * @param accountDoc expects account document to get the role
 * @returns {boolean}
 */

function checkAccess(req, accountDoc) {

    const method    = req.method.toLowerCase();
    const path      = req.path;
    const role      = accountDoc.role;

    console.log('method', method);
    console.log('path', path);
    console.log('role', role);

    let allowed   = false;

    //tukaj loop-amo; ce najdemo item, kateremu ustrezajo ti pogoji(method, path, role)
    _.each(aclList, (aclItem, i) => {

        const pattern = new UrlPattern(aclItem.path);
        const match = pattern.match(path);

        if(match){

            _.each(aclItem.roles, (_role, j)=>{

                if(_role.type === role){

                    _.each(_role.methods, (_method, k)=>{

                       if(_method === method.toLowerCase()){

                           allowed = true;
                       }
                    });
                }
            });
        }

    });

    return allowed;

}
