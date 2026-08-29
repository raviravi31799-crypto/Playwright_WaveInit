import {Given,When,Then} from "@cucumber/cucumber";
import CustomWorld from "../../world/world";





Given('the admin user is logged in', async function (this:CustomWorld) {
    await this.loginPage.Adminlogin();
   
});

Given('the admin is on the Interviews page', async function (this:CustomWorld) {
   await this.interviewpage.openInterviewsPage();
});

When('the admin clicks on the Schedule Interview button', async function (this:CustomWorld) {
  await this.interviewpage.clickScheduleInterview();
});

When('the admin enters all required interview details {string} {string} {string} {string} {string} {string} {string}', async function (this:CustomWorld, interviewTitle: string,
        interviewDate: string,
        interviewTime: string,
        meetingType: string,
        interviewType: string,
        duration: string,
        notes: string) {
             await this.interviewpage
            .enterInterviewTitle(interviewTitle);


        // Random Candidate
       
            await this.interviewpage
                .selectRandomCandidate();


        // Random Interviewer
       
            await this.interviewpage
                .selectRandomInterviewer();


        // Interview date
        await this.interviewpage
            .enterInterviewDate(interviewDate);


        // Interview time
        await this.interviewpage
            .enterInterviewTime(interviewTime);


        // Meeting type
        await this.interviewpage
            .selectMeetingType(meetingType);


        // Interview type
        await this.interviewpage
            .selectInterviewType(interviewType);


        // Duration
        await this.interviewpage
            .selectDuration(duration);


        // Notes
        await this.interviewpage
            .enterNotes(notes);


        

    }
);
  


When('the admin schedules the interview', async function (this:CustomWorld) {
 await this.interviewpage.scheduleInterview();
});

Then('the interview should be displayed in the scheduled interviews list', async function (this:CustomWorld) {
  await this.interviewpage.verifyInterviewScheduled();
});

