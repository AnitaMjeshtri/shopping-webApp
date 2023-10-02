<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
  //creating a constructor to say that the middleware is the api

    public function _construct(){
      $this->middleware('auth:api',['except'=>['login', 'signup']]);
    }
    public function signup(Request $request){
      $validator = Validator::make($request->all(),[
          'name' => 'required',
          'email' => 'required|string|email|unique:users',
          'password' => 'required|string|confirmed|min:6'
          //saying that the password will be string and the same with the confirmed one, min 6
      ]);

      if($validator->fails()){
        return response()->json($validator->errors()->toJson(), 422); //status quo 422
      }

      //creating user accounts
      $user = User::create(array_merge(
        $validator->validated(),
        ['password' => bcrypt($request->password)] //bcrypt->hashing the password
      ));

      $token = $user->createToken('main')->plainTextToken;

      return response()->json([
        'message' => 'User successfully registered',
        'user' => $user,
        'token' => $token
      ],201);
      // return response(compact('user', 'token'));
    }

    public function login(Request $request){
      $validator = Validator::make($request->all(),[
        'email' => 'required|email',
        'password' => 'required|string|min:6'
      ]);

      if($validator->fails()){
        return response()->json($validator->errors(),422);
      }

      if(! $token=auth()->attempt($validator->validated())){
        return response([
          'message'=>'Incorrect email or password! Please check again!'
        ],401);
      }

      /** @var User $user */
      $user = Auth::user();
      $token = $user->createToken('main')->plainTextToken;
      // return $this->createNewToken($token);
      return response(compact('user', 'token'));
    }

    public function createNewToken($token){
      $expiresInMinutes = config('auth.defaults.guard.api.expires') ?: config('auth.defaults.guard.api.expires', 60);
        return response()->json([
          'access_token' => $token,
          'token_type' => 'bearer',
          'expires_in' => $expiresInMinutes * 60,
          'user' => auth()->user()
        ]);
    }

    public function profile(){
      return response()->json(auth()->user());
    }

    public function logout(){
      Auth::user()->tokens->each(function ($token, $key) {
        $token->delete();
    });

    return response()->json(['message' => 'Logged out successfully']);
    }
}
