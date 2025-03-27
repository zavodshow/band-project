<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \URL::forceScheme('https');
    
        // Add this if you're behind a proxy/load balancer
        $this->app['request']->server->set('HTTPS', 'on');
        \Illuminate\Support\Facades\Request::setTrustedProxies(
            ['127.0.0.1', '::1', 'nginx'], // Add your nginx container IP if needed
            \Illuminate\Http\Request::HEADER_X_FORWARDED_ALL
        );
        
        ini_set('upload_max_filesize', env('UPLOAD_MAX_FILESIZE', '2048M'));
        ini_set('post_max_size', env('POST_MAX_SIZE', '2048M'));
    }
}
