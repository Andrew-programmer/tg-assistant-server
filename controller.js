const bot = require('./index');

class BotController {
    async receiveData (req, res) {
        const {
            queryId,
            products,
            totalPrice
        } = req.body;

        try{
            await bot.answerWebAppQuery(queryId, {
                type: 'article',
                id: queryId,
                title: 'Successful purchase',
                input_message_content: {
                    message_text: 'We really enjoy of your choice! Total: ' + totalPrice
                }
            })

            return res.status(200).json({message: 'Successful receiving'})
        } catch (e){
            await bot.answerWebAppQuery(queryId, {
                type: 'article',
                id: queryId,
                title: 'Unsuccessful purchase',
                input_message_content: {
                    message_text: 'Something went wrong. You can try one more time or write to our manager'
                }
            })
            return res.status(500).json({message: 'Receive data error'})
        }
    }
}

module.exports = new BotController();
