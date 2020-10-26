
$(function(){

    $('#signUpToggle').on('click', () => {
        container.classList.add("right-panel-active");
    });

    $('#signIn').on('click', () => {
        container.classList.remove("right-panel-active");
    });

    $('#signUp').click(function(event){
        event.preventDefault();
        console.log($("#name").val());
        console.log($("#email").val());
        console.log($("#password").val());

        if( !unameValid() || !emailValid() || !passwordValid())
            alert("please enter correct data ???")
        else
        {
            // write users data
            // isStudent flag for student 1 business 2 , in next stage update this value
            alert("Done")
            stdData = {name:$("#name").val(), email:$("#email").val(),password:$('#password'),isStudent:-1}
            $.ajax({
                url:"http://localhost:8081/addUser",
                method: "POST",
                data:stdData,
                success:function(){console.log("done")},
                error:function(){console.log("fail")}
            })
            $('#signIn').trigger('click')
        }
           
    })

    $('#signin').click(function(event){
        event.preventDefault();
        console.log($("#sign_email").val());
        console.log($("#sign_password").val());
        var email=$("#sign_email").val();
        var password=$("#sign_password").val();

        // check user email and password  sign in
        $.ajax({
            url:"http://localhost:8081/listUsers",
            method: "GET",
            dataType:"JSON",
            context:document.body,
            success:function(data){
                //console.log(data[0])
                for(let i=0; i<data.length; i++)
                {
                    if(email === `${data[i].email}` && password === `${data[i].password}`){
                        if(`${data[i].isStudent == 1}`)
                            window.location.href = "../StudentMate.html";
                        else
                            window.location.href = "../Business-Mate.html";

                    }
                    else{
                        alert("Email Or Password is not correct ???")
                        //$('#sign_email').css({'background-color': 'Red'});
                       //$('#sign_password').css({'background-color': 'Red'});
                    }
                }
            },
            error:function(){console.log("fail")}
        }).done(function(){$(this).find("table").css("background","red")})
    })
   

})


function unameValid(){
    var pattern = new RegExp(/[a-zA-Z]{5,50}/);
    if(pattern.test($('#name').val())){
        $('#name').css({'background-color': '#EEEEEE'});
        return true;
    } else {
        $('#name').css({'background-color': 'Red'});
        return false;
    }   
}

function emailValid(){  
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if($('#email').val().match(mailformat))
        {
            $('#email').css({'background-color': '#EEEEEE'});
            return true
        }
        else{
                $('#email').css({'background-color': 'Red'});
                return false;
            }   

}

function passwordValid(){
    if($('#password').val().length > 10 ){
        $('#password').css({'background-color': '#EEEEEE'});
        return true;
    } else {
        $('#password').css({'background-color': 'Red'});
        return false;
    }   
}



  function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    window.location.href = "http://127.0.0.1:5500/HTML/home.html";
  }

  function singOut(){
    gapi.auth2.getAuthInstance().signOut().then(function(){
      console.log("User signed Out")
    })
  }

      
