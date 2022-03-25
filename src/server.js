var _a;
import app from './app';
const PORT = (_a = process.env.RUN_PORT) !== null && _a !== void 0 ? _a : 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
