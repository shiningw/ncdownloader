#!/bin/sh
php=$(which php)
dir=$(dirname "$0")
script="${dir}/../../../occ"

#$php "${dir}/run.php" aria2 start $1 $2 $3
$php $script aria2 error $1 $2 $3