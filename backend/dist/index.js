import app from './app.js';
import { ConnectToDatabase } from './db/connection.js';
// connections and listeners 
const PORT = process.env.PORT || 5000;
ConnectToDatabase().then(() => {
    app.listen(PORT, () => console.log("Server Open and Connected to Database"));
}).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map