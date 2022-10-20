<?php 
namespace App\Models\Appsvc;

use CodeIgniter\Model;
use Config\Database;

class Connect_Model extends Model {

    private $mDb;
    private $mBuilder;
    private $mTbName ;
    private $mJoinTbName ;
    private $mTbColumn;


    function __construct($category)
    {
        $this->mTbName = "tbl_".strval($category)."_session";
        $this->mJoinTbName = "tbl_".strval($category)."_member";
        $this->mDb      = Database::connect();
        if($this->mDb->tableExists($this->mTbName))
            $this->mBuilder = $this->mDb->table($this->mTbName);

        $this->mTbColumn = ['sess_id', 'sess_time_begin', 'sess_time_last', 'sess_pub_addr', 
            'sess_emp_fid', 'sess_mb_uid', 
            'sess_memo_1', 'sess_memo_2', 'sess_memo_3', 'sess_memo_4', 'sess_memo_5', 
            'sess_memo_6', 'sess_memo_7', 'sess_memo_8', 'sess_memo_9', 'sess_memo_10', 
            'sess_prop_1', 'sess_prop_2', 'sess_prop_3', 'sess_prop_4', 'sess_prop_5', 
            'sess_prop_6', 'sess_prop_7', 'sess_prop_8', 'sess_prop_9', 'sess_prop_10'  ];

    }

    public function clear(){
        return $this->mBuilder->truncate();
    }
    
    public function getById($sess_id){
        
        try {             
            $this->mBuilder ->select($this->mTbColumn)
                            ->where('sess_id', $sess_id)
                            ->getCompiledSelect(false);
            $query = $this->mBuilder->get();
            return $query->getRow();
            
        } catch (\Exception $e) {  
            return NULL;
        }
        return NULL;
    }
    
    public function getByUid($sess_mb_uid){
        
        try {             
            $this->mBuilder ->select($this->mTbColumn)
                            ->where('sess_mb_uid', $sess_mb_uid)
                            ->getCompiledSelect(false);
            $query = $this->mBuilder->get();
            return $query->getResult();
            
        } catch (\Exception $e) {  
            return NULL;
        }
        return NULL;
    }
    
    function register($sess_id, $objMember, $ip_addr){
        
        $objConn = $this->getById($sess_id);
        if(!is_null($objConn)){
            $this->deleteById($objConn->sess_id);
        }

        $this->mBuilder->set('sess_id', $sess_id);
        $this->mBuilder->set('sess_time_begin', 'NOW()', false);
        $this->mBuilder->set('sess_time_last', 'NOW()', false);
        $this->mBuilder->set('sess_pub_addr', $ip_addr);
        $this->mBuilder->set('sess_emp_fid', $objMember->mb_emp_fid);
        $this->mBuilder->set('sess_mb_uid', $objMember->mb_uid);
        
        return $this->mBuilder->insert();   //if success, return true
            
    }

    function updateConnect($conn){        


        $this->mBuilder->set('sess_time_last', 'NOW()', false);
        $this->mBuilder->set('sess_pub_addr', $conn->sess_pub_addr);
        if(strlen($conn->sess_memo_1) > 0)
            $this->mBuilder->set('sess_memo_1', $conn->sess_memo_1);
        if(strlen($conn->sess_memo_2) > 0)
            $this->mBuilder->set('sess_memo_2', $conn->sess_memo_2);
        if(strlen($conn->sess_memo_3) > 0)
            $this->mBuilder->set('sess_memo_3', $conn->sess_memo_3);
        if(strlen($conn->sess_memo_4) > 0)
            $this->mBuilder->set('sess_memo_4', $conn->sess_memo_4);
        if(strlen($conn->sess_memo_5) > 0)
            $this->mBuilder->set('sess_memo_5', $conn->sess_memo_5);
        if(strlen($conn->sess_memo_6) > 0)
            $this->mBuilder->set('sess_memo_6', $conn->sess_memo_6);
        if(strlen($conn->sess_memo_7) > 0)
            $this->mBuilder->set('sess_memo_7', $conn->sess_memo_7);
        if(strlen($conn->sess_memo_8) > 0)
            $this->mBuilder->set('sess_memo_8', $conn->sess_memo_8);
        if(strlen($conn->sess_memo_9) > 0)
            $this->mBuilder->set('sess_memo_9', $conn->sess_memo_9);
        if(strlen($conn->sess_memo_10) > 0)
            $this->mBuilder->set('sess_memo_10', $conn->sess_memo_10);

        if(strlen($conn->sess_prop_1) > 0)
            $this->mBuilder->set('sess_prop_1', $conn->sess_prop_1);
        if(strlen($conn->sess_prop_2) > 0)
            $this->mBuilder->set('sess_prop_2', $conn->sess_prop_2);
        if(strlen($conn->sess_prop_3) > 0)
            $this->mBuilder->set('sess_prop_3', $conn->sess_prop_3);
        if(strlen($conn->sess_prop_4) > 0)
            $this->mBuilder->set('sess_prop_4', $conn->sess_prop_4);
        if(strlen($conn->sess_prop_5) > 0)
            $this->mBuilder->set('sess_prop_5', $conn->sess_prop_5);
        if(strlen($conn->sess_prop_6) > 0)
            $this->mBuilder->set('sess_prop_6', $conn->sess_prop_6);
        if(strlen($conn->sess_prop_7) > 0)
            $this->mBuilder->set('sess_prop_7', $conn->sess_prop_7);
        if(strlen($conn->sess_prop_7) > 0)
            $this->mBuilder->set('sess_prop_7', $conn->sess_prop_8);
        if(strlen($conn->sess_prop_9) > 0)
            $this->mBuilder->set('sess_prop_9', $conn->sess_prop_9);
        if(strlen($conn->sess_prop_10) > 0)
            $this->mBuilder->set('sess_prop_10', $conn->sess_prop_10);

        $this->mBuilder->where('sess_id', $conn->sess_id);
        return $this->mBuilder->update();   //if success, return true
            
    }

    function deleteById($sess_id){
        $this->mBuilder->resetQuery();
        
        $this->mBuilder->where('sess_id', $sess_id);
        return $this->mBuilder->delete();   //if success, return true
    }

    function deleteByUid($sess_mb_uid){
        $this->mBuilder->resetQuery();

        $this->mBuilder->where('sess_mb_uid', $sess_mb_uid);
        return $this->mBuilder->delete();   //if success, return true
    }

    function deleteLast(){
        
        $tmLimit = date("Y-m-d H:i:s", strtotime("-".CONNECT_TIMEOUT." minutes", time()));

        $this->mBuilder->where('sess_time_last < ', $tmLimit);
        return $this->mBuilder->delete();   //if success, return true
    }

    function searchCount($arrEmpId, $search = ""){
        
        try { 
            if(!is_array($arrEmpId))
                return 0;
            if(count($arrEmpId) < 1)
                return 0;

            $where = "sess_emp_fid > '0' ";
            if(strlen($search) > 0){
                $where .= " AND (sess_mb_uid LIKE '%".$search."%' )";    
            }
            
            $this->mBuilder ->select($this->mTbColumn)                            
                            ->where($where)
                            ->whereIn('sess_emp_fid', $arrEmpId)
                            ->getCompiledSelect(false);

            return $this->mBuilder->countAllResults();
            
        } catch (\Exception $e) {  
            return 0;
        }
        return 0;
    }

    function searchList($arrEmpId, $page, $cntPer = 20, $search = ""){
        
        try { 
            if(!is_array($arrEmpId))
                return NULL;
            if(count($arrEmpId) < 1)
                return NULL;
            if($page < 1)
                return NULL;
            if($cntPer < 1)
                return NULL;

            $where = "sess_emp_fid > '0' ";
            if(strlen($search) > 0){
                $where .= " AND (sess_mb_uid LIKE '%".$search."%' )";            
            }
            
            array_push($this->mTbColumn, 'mb_vip');
            array_push($this->mTbColumn, 'mb_emp_fid');

            $this->mBuilder ->select($this->mTbColumn)    
                            ->join($this->mJoinTbName, $this->mJoinTbName.'.mb_uid = '.$this->mTbName.'.sess_mb_uid')                     
                            ->where($where)
                            ->whereIn('sess_emp_fid', $arrEmpId)
                            ->getCompiledSelect(false);

            $query = $this->mBuilder->get($cntPer, $cntPer*($page-1));
            return $query->getResult();
            
        } catch (\Exception $e) {  
            return NULL;
        }
        return NULL;
    }


    function hasRepeatUid($mb_uid, $ip_addr = "") {

        $where = "sess_mb_uid = '".$mb_uid."' ";
        if(strlen($ip_addr) > 0){
            $where .= " AND sess_pub_addr = '".$ip_addr."' ";            
        }
        try {             
            $this->mBuilder ->select($this->mTbColumn)
                            ->where($where)
                            ->getCompiledSelect(false);
            $query = $this->mBuilder->get();
            $arrConn = $query->getResult();
        
            if(is_null($arrConn))
                return false;
            if(count($arrConn) < 1)
                return false;
            return true;
            
        } catch (\Exception $e) {  
            return false;
        }
        return false;

    }


}