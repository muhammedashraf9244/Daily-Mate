$(function(){
    //handle the submit action on form to get data from form elements the add it to task area
    $("#addStudent").submit(function(event){
        //check validation of data
        if(checkData())
        {
           
            
            //create the task element then append it to task area
            appendNewTask(createTaskElement());
            
            //clear data in form
            clearData();
        }
        else
            alert("failed")
        
        //to prevent reloading
        event.preventDefault();
    })

    //handling click on btnSubTask to dynamicly add control 
    $("#btnSubTask").click(function(){
        //create the text box and x button next to it
        var subtask = "<tr><td><input type='text' name='subTask' style='width: 85%;' id='Task' placeholder='Add sub task'><input type='button' value='Close' name='deleteSubTask' class='btnclose'></td></tr>"
        
        //append it to the table
        $(".leftContainer").find("table").append(subtask)
    })

    //handling click on X button for subtask control to delete it 
    //using on dynamic event binding to attach click event it to dynamicly created elements
    $(".leftContainer > form > table").on("click","tr>td>input[name=deleteSubTask]",function(){
        //delete the tr containing the control
        $(this).parent().parent().remove()
    })

    //check validation of data
    function checkData(){
        //get all text boxes (great task and subtask)
        var inputList = $("#addStudent").find("input[type=text]")
        
        //loop on them and check that they each has value
        for(let i=0; i<inputList.length; i++)
            if(inputList[i].value.length == 0)
                //return false if one of them has empty value 
                return false;
        
        //return true if each has value
        return true;
    }

    //clear data after successfully adding the task
    function clearData()
    {
        //triggre the click event to make all x buttons delete themself
        $("[name=deleteSubTask]").trigger("click")
        //clear great task control value
        $("#Task").val("")
    }

    //create the task element
    function createTaskElement()
    {
        var div;
        var subTasks = $("[name=subTask]")
        //if no sub tasks
        if(subTasks.length == 0){   
            div = `<div class='taskDiv ${$("select").val()}'>
                        <input type='checkbox' name='TaskCheck'> <label> ${$("#Task").val()} </label>
                        <br><input type='button' name='deleteTaskElelment' value='X'>
                    </div>`
        }
        
        //if there are sub tasks
        else{
            div = `<div class='taskDiv ${$("select").val()}'>
                        <input type='checkbox' name='TaskCheck' disabled> <label> ${$("#Task").val()} </label>`
            
            for(let i=0; i<subTasks.length; i++)
            {
                div += `<br>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' name='subTaskCheck'> <label>${subTasks[i].value}</label>`
            }
                      
            div += `<br><input type='button' name='deleteTaskElelment' value='X'></div>`
        }
        return div;
    }

    //add the created task to the left side (task area)
    function appendNewTask(task)
    {
        $(".rightContainer").append(task)
    }

    //handle on deleteTaskElelment click to delete the task from task area dynamicly
    $(".rightContainer").on("click","div[class*='taskDiv']>input[name='deleteTaskElelment']",function(){
        //make it fadeout then delete after fading out to make the effect of animation
        //rather than deleting it directly
        $(this).parent().fadeOut('slow', function(){ $(this).remove(); });
    })

    //handel on checkbox checked text become strick
    $(".rightContainer").on("click","div[class*='taskDiv']>input[name*='TaskCheck']",function(){
        //if click the check box and make it check make text in label strick
        if($(this).prop("checked") == true)
            $(this).next().css("text-decoration", "line-through")
        
        //else make text in label not strick
        else
            $(this).next().css("text-decoration", "none")
    })

    //handle when the task title is checked the the task should be removed
    $(".rightContainer").on("click","div[class*='taskDiv']>input[name='TaskCheck']",function(){
        //fire the click event on the button x of the same task
        $(this).siblings().last().trigger("click")
    })

    //enable the great task if sub tasks are all checked
    $(".rightContainer").on("click","div[class*='taskDiv']>input[name='subTaskCheck']",function(){
        //if click subtask checkbox made it cheched make sure that all subtasks checked
        //if all checked then enable great task
        if($(this).prop("checked") == true){
            //get all siblings that are subtasks onlt
            var siblings = $(this).siblings("[name='subTaskCheck']")
            var allChecked = true

            //check that they are all checked
            for(let i=0; i<siblings.length; i++)
                if(!siblings[i].checked)
                    allChecked = false

            //if they are all checked enable the great task
            if(allChecked)
                $(this).siblings().first().prop("disabled",false)
        }

        //else if making it non checked make great task disabled
        else{
            $(this).siblings().first().prop("disabled",true)
        }
        
    })
})