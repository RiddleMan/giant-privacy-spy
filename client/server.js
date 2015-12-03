import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: './src'
}).listen(3000, '0.0.0.0', (err) => {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3000');
});
