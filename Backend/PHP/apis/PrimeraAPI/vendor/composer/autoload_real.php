<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitdc2f657da6a6c874dbc369ebb5d64e89
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInitdc2f657da6a6c874dbc369ebb5d64e89', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitdc2f657da6a6c874dbc369ebb5d64e89', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitdc2f657da6a6c874dbc369ebb5d64e89::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
