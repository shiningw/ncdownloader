<?php

namespace OCA\NCDownloader\Aria2;

class RunOptions
{
    protected $options = [
        '--continue',
        '--daemon=true',
        '--enable-rpc=true',
        '--rpc-secret=ncdownloader123',
        '--listen-port=51413',
        '--rpc-listen-port=6800',
        '--follow-torrent=true',
        '--enable-dht=true',
        '--enable-peer-exchange=true',
        '--peer-id-prefix=-TR2770-',
        '--user-agent=Transmission/2.77',
        '--log-level=notice',
        '--seed-ratio=1.0',
        '--bt-seed-unverified=true',
        // '--max-overall-upload-limit=' . $this->upSpeed,
        // '--max-overall-download-limit=' . $this->dlSpeed,
        '--max-connection-per-server=4',
        '--max-concurrent-downloads=10',
        '--check-certificate=false',
    ];

    public function __construct($options)
    {
        foreach ($options as $name => $value) {
            $name = trim($name);
            $value = trim($value);
            if (!str_starts_with($value, "--")) {
                $name = "--" . $name;
            }
            if ($value) {
                $option = $name . "=" . $value;
            } else {
                $option = $name;
            }
            $this->add($option);
        }
    }

    public function add($option)
    {
        $option = trim($option);
        if ($i = $this->find($option)) {
            $this->options[$i] = $option;
            return $this;
        }
        array_push($this->options, $option);
        return $this;
    }
    protected function find($option)
    {
        if (!str_starts_with($option, "--")) {
            $option = "--" . $option;
        }
        if (($i = stripos($option, '=')) === false) {
            return $i;
        }
        $name = substr($option, 0, $i);
        foreach ($this->options as $index => $value) {
            list($optionName,) = explode("=", $value);
            if ($name == $optionName) {
                return $index;
            }
        }
        return false;
    }
    public function has($option)
    {
        return (bool) array_search($option, $this->options);
    }

    public function getOptions()
    {
        return $this->options;
    }
}
