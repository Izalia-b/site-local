<?php  
class Database
{
    const TABLE = 'users';//название таблицы
    const TABLELOG = 'log';
    const  TABLETIME = 'time';
    const DATABASE = 'users.db';//название БД
    private $pdo;
    


    //Соединение с БД
    public function connect()
    {
        $this->pdo=new PDO('sqlite:'.__DIR__.'/db/'. $this::DATABASE);
        return $this->pdo;
    }



    // Cоздание таблицы  //  AUTOINCREMENT-дает айди
    public function createTableLog()
    {
        $this->pdo->query("CREATE TABLE IF NOT EXISTS ". $this::TABLELOG."( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            order_id TEXT,
            result TEXT,
            date TEXT
            
            )");
    }

    public function createTable()
    {
        $this->pdo->query("CREATE TABLE IF NOT EXISTS ". $this::TABLE ."( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT,
            phone TEXT,
            data DATETIME,
            myId TEXT,
            file_link TEXT
            )");
    }


    // Функция для записи информации-защита от иньекций
    public function createRecord($data)
    {
        $date=time();
        $sql="INSERT INTO " . $this::TABLE . " (name, phone, data,  myId,file_link) VALUES (:name, :phone, " . $date. ", :myId, :upload_file)";//переменные : значения
        $request =$this->pdo->prepare($sql);//подготовка запроса
        if ($request) {
            $request->execute($data);//execute - выполняет sql запрос
        }
        //     return $this->pdo->lastInsertId();//возвращает последний добавленый id?
    }


    public function createRecordLog($data)
    {
        $date=time();
        $sql="INSERT INTO " . $this::TABLELOG . " (order_id ,result, date) VALUES ( :order_id, :result, " . $date. ")";//переменные : значения
        $request =$this->pdo->prepare($sql);//подготовка запроса
        if ($request) {
            $request->execute($data);//execute - выполняет sql запрос
        }
        //     return $this->pdo->lastInsertId();//возвращает последний добавленый id?
    }


    
    public function createTableTime()
    {
        $this->pdo->query("CREATE TABLE IF NOT EXISTS ". $this::TABLETIME."( 
           dateAdmin TEXT,
           admin TEXT,
           user TEXT,
           dateUser TEXT
            )");
    }
    public function createRecordTime($dataOne)
    {
        $sql="INSERT INTO " . $this::TABLETIME . " ( dateAdmin, admin, user, dateUser) 
        VALUES (:dateAdmin, :result, :dateUser , :resultUser)";//переменные : значения
        $request =$this->pdo->prepare($sql);//подготовка запроса
        if ($request) {
            $request->execute($dataOne);//execute - выполняет sql запрос
        }
        //     return $this->pdo->lastInsertId();//возвращает последний добавленый id?
    }




    // Функция для просмотра
    public function showRecords()
    {
        $sql="SELECT * FROM ".$this::TABLE. " ORDER by id DESC"; //получить все данные из нашей таблицы  и сортирует в обратном порядке
        $request =$this->pdo->prepare($sql);//подготовка запроса
        if ($request) {
            $request->execute();//выполнение
        }
        return  $request;//возвращает результат
    }
    // Функция для поиска
    public function showRecordsChoice($filter)
    {
        if (isset($filter) && $filter) {
            $sql="SELECT * FROM ".$this::TABLE. " WHERE name LIKE " . "'" . $filter . "'" .  " ORDER by id DESC ";
        } else {
            $sql =  "SELECT * FROM " .$this::TABLE. " ORDER by id DESC";
        } //получить все данные из нашей таблицы  и сортирует в обратном порядке
        $request =$this->pdo->prepare($sql);//подготовка запроса
        if ($request) {
            $request->execute();//выполнение
        }
        return  $request;//возвращает результат
    }

    
    public function showRecordsLog()
    {
        $sql="SELECT * FROM ".$this::TABLELOG. " ORDER by id DESC"; //получить все данные из нашей таблицы  и сортирует в обратном порядке
        $request =$this->pdo->prepare($sql);//подготовка запроса
        if ($request) {
            $request->execute();//выполнение
        }
        return  $request;//возвращает результат
    }

  
    public function getPhoneFromeTable($filter)
    {
        if (isset($filter) && $filter) {
            $sql="SELECT phone FROM ".$this::TABLE. " WHERE phone LIKE " . "'" . $filter . "'";
            $request1 =$this->pdo->prepare($sql);//подготовка запроса
            if ($request1) {
                $request1->execute();//выполнение
            }
            return  $request1;//возвращает результат
        }
    }
}