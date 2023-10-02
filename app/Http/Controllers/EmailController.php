<?php

namespace App\Http\Controllers;

use App\Mail\SendMail;
use App\Models\Subscribers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function index(Request $request){

      $validateData = $request->validate([
        'email' => 'required|email|unique:subscribers'
      ]);

      $email = $request->input('email');

      if($validateData){
          $testMailData = [
                  'title' => 'Welcome to Prenatal - Your Subscription Has Begun!',
                  'header' => 'As a subscriber, you can look forward to the following benefits:',
                  'l1' => 'Each morning, you\'ll receive a fresh edition of Prenatal right in your inbox,
                  packed with the latest news, insights, and products.',
                  'l2' =>'Access Prenatal on the go with our user-friendly website. Stay informed anytime, anywhere.',
                  'contact'=>'Contact Us',
                  'question'=>'If you ever have questions, need assistance, or want to provide feedback,
                  our customer support team is here to help.',
                  'regards'=>'Best regards,',
                  'team'=>'Prenatal Team'
                ];

                Subscribers::create([
                  'email'=>$email
                ]);

                Mail::to($email)->send(new SendMail($testMailData));

                return response()->json(['message'=>'email sent successfully'], 200);
      }
      else{
        return response()->json(['message' => 'error occurred'], 422);
      }
    }
}
