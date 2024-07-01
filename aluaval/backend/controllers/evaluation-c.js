import Evaluation from '../models/evaluation-m';

const EvaluationController = {
    getEvaluationByID: async (req, res) => {
        const id = req.params.id;

        try {
            const user = await Evaluation.findByPk(id);
            
        } catch (err) {
            
        }
    }
}

export default EvaluationController;