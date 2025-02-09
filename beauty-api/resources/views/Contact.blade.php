@extends('layout.app')
@section('content')

<div class="container-fluid">
    <div class="row">
        <div class="col-12 p-2 bg-dark">
            <h1 class="text-center text-light titles">C O N T A C T</h1>
        </div>
    </div>
</div><br>
<div class="center text-center"><img src="{{ asset('img/whiteLogoH.png') }}" class="logo" alt=""></div>
<!--FORM CONTACT-->
<br><br>
<form>
  <div class="container" display:flex margin-top:2rem>
    <div class="row justify-content-md-center">
        <div class="col-12 col-sm-12 col-md-6 col-xl-6 padding-inputs">
        <div class="row min-padding">
        <input type="text" class="form-control input-lg" placeholder="Enter Your Subject" aria-label="Subject" aria-describedby="addon-wrapping">
        </div>
        <br>
        <div class="row">
            <textarea rows="8" class="form-control input-lg" id="textarea" placeholder="What is in your mind?" required></textarea>
        </div>
        </div>
       <div class="invalid-feedback">
            Please enter a message
       </div>
      </div>
      <br>
        <div class="container">
            <div class= "row justify-content-md-center">
        <button type="button" class="btn-lg btn-primary"> SEND MESSAGE</button>
        </div>
    </div>
</div>
</form>

<style>
  .input-style{

  }
</style>
@endsection
