<?php
// var_dump($_POST);

if(validate($_POST)){
$client = new Client;
$client->checkDate($_POST);
var_dump($client);
}else{
    header('location:/?error=name');
}


function validate($data)
{
    if (isset($data['name_guest']) && $data['name_guest']) {
        return true;
    }
    return false;
}
class Client
{
    public $name_guest,
        $present,
        $popcorn,
        $agree;
    public function checkDate($data)
    {
        $this->name_guest = $data['name_guest'];

        if (isset($data['present']) && $data['present']) {
            $this->present = $data['present'];
        }
        if (isset($data['popcorn']) && $data['popcorn']) {
            $this->popcorn = $data['popcorn'];
        }
        if (isset($data['agree']) && $data['agree']) {
            $this->agree = $data['agree'];
        }
    }
}
