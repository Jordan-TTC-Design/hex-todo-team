const PASSWORD = process.env.PASSWORD || '1234qwer';
const DATABASE =
	process.env.DATABASE?.replace('<password>', PASSWORD) ??
	`mongodb+srv://chunhsing0921:${PASSWORD}@20220314.mo6lm.mongodb.net/teamtodos?retryWrites=true&w=majority`;

module.exports = DATABASE;
