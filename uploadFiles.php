<?php

class WebUpload {
public function post_upload(){
    
            $input = Input::all();
            $rules = array(
                'file' => 'text/csv|max:3000',
            );
    
            $validation = Validator::make($input, $rules);
    
            if ($validation->fails())
            {
                return Response::make($validation->errors->first(), 400);
            }
    
            $file = Input::file('file');
    
            $extension = File::extension($file['name']);
            $directory = path('public').'content/'.sha1(time());
            $filename = sha1(time().time()).".{$extension}";
    
            $upload_success = Input::upload('file', $directory, $filename);
    
            if( $upload_success ) {
                return Response::json('success', 200);
            } else {
                return Response::json('error', 400);
            }
        }

    }





















// In PHP versions earlier than 4.1.0, $HTTP_POST_FILES should be used instead
// of $_FILES.

// $uploaddir = '/content/';
// $uploadfile = $uploaddir . basename($_FILES['file']['name']);

// echo '<pre>';
// if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
//     echo "File is valid, and was successfully uploaded.\n";
// } else {
//     echo "Possible file upload attack!\n";
// }

// echo 'Here is some more debugging info:';
// print_r($_FILES);

// print "</pre>";
    
?>
        