import { Request, Response, NextFunction } from 'express';
import { Utils } from '../../utils/server_utils';
import User from '../../rmembr/user/user';
import Section from '../../rmembr/planner/section';
import Subsection from '../../rmembr/planner/subsection/subsection';

/** 
 * File contains all middleware function based on major planner paths. 
 */

const middleware: {
    [type: string]: {
        [type: string]: ((req: Request, res: Response, next: NextFunction) => Promise<void>)
    }
} = {
    'planner': {},
    'courses': {},
    'sections': {},
    'subsections': {
        'refresh': async (req: Request, res: Response, next: NextFunction) => {
            try {
                Utils.validateObject(req.params, 'courseId');
                Utils.validateObject(req.params, 'sectionId');
                const user: User = req.body.user;
                const associatedSection: Section = await Section.get(user.id, req.params.courseId, req.params.sectionId);
                Subsection.refreshAll(associatedSection.subsectionGroupId);
                return next();
            } catch (err) {
                return next(err);
            }
        }
    },
    'default': {
        'ignore': async (req: Request, res: Response, next: NextFunction) => {next();}
    }
}

export const getMiddleware = (inPath: string): ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] => {
    if (inPath in middleware) {
        return Object.values(middleware[inPath]);
    }
    return Object.values(middleware['default']);
}