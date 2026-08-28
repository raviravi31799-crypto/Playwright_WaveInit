import { Page, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { ENV } from "../../utils/envReader";


export class ScheduleInterviewPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

   
    // Locators
    
    private interviewpage= this.page.getByRole("heading", {
                name: "Interviews"});

    private scheduleInterviewButton = this.page.getByRole("button", {
        name: /Schedule Interview/i
    });

    private interviewTitle = this.page.locator("//input[@placeholder='e.g., Senior Developer Technical Interview']");
    private interviewDate = this.page.locator(
        'input[type="date"]'
    );

    private interviewTime = this.page.locator(
        'input[type="time"]'
    );

    private notes = this.page.locator(
        'textarea[placeholder*="Optional notes about this interview"]'
    );
    private candidateDropdown = this.page.getByRole("button", {
        name: "Select candidate",
        exact: true
    });

    private interviewerDropdown = this.page.getByRole("button", {
        name: "Select interviewer",
        exact: true
    });

   private meetingTypeDropdown = this.page
    .locator('label', { hasText: /^Meeting Type$/ })
    .locator('xpath=following-sibling::select');

private interviewTypeDropdown = this.page
    .locator('label', { hasText: /^Interview Type$/ })
    .locator('xpath=following-sibling::select');

private durationDropdown = this.page
    .locator('label', { hasText: /^Duration$/ })
    .locator('xpath=following-sibling::select');
   

    async openInterviewsPage(): Promise<void> {

       await this.page.getByRole("button", {
        name: "Interviews"
    }).click();

    await expect(
        this.page.getByRole("heading", {
            name: "Interviews"
        })
    ).toBeVisible({
        timeout: 30000
    });
    }


   
    async clickScheduleInterview(): Promise<void> {

        await this.scheduleInterviewButton
            .first()
            .click();

        await expect(
            this.page.getByRole("heading", {
                name: "Schedule Interview"
            })
        ).toBeVisible();
    }


   

    async enterInterviewTitle(
        title: string
    ): Promise<void> {

        await this.interviewTitle.fill(title);
        
    }


    

    async selectRandomCandidate(): Promise<string> {

        await this.candidateDropdown.click();

        // Get visible dropdown options
        const options = this.page.locator(
            '[role="option"]:visible'
        );

        const count = await options.count();

        if (count === 0) {
            throw new Error(
                "No candidates found in Candidate dropdown"
            );
        }

        // Generate random index
        const randomIndex = Math.floor(
            Math.random() * count
        );

        // Get selected candidate name
        const candidateName = (
            await options
                .nth(randomIndex)
                .innerText()
        ).trim();

        // Select candidate
        await options
            .nth(randomIndex)
            .click();

        console.log(
            `Selected Candidate: ${candidateName}`
        );

        return candidateName;
    }


    

    async selectRandomInterviewer(): Promise<string> {

        await this.interviewerDropdown.click();

        const options = this.page.locator(
            '[role="option"]:visible'
        );

        const count = await options.count();

        if (count === 0) {
            throw new Error(
                "No interviewers found in HR / Interviewer dropdown"
            );
        }

        const randomIndex = Math.floor(
            Math.random() * count
        );

        const interviewerName = (
            await options
                .nth(randomIndex)
                .innerText()
        ).trim();

        await options
            .nth(randomIndex)
            .click();

        console.log(
            `Selected Interviewer: ${interviewerName}`
        );

        return interviewerName;
    }


    
    
   

    async enterInterviewDate(
        date: string
    ): Promise<void> {

         console.log(`Date received: ${date}`);

    // Convert DD-MM-YYYY → YYYY-MM-DD
    const [day, month, year] = date.split("-");

    const formattedDate = `${year}-${month}-${day}`;

    console.log(`Date converted to: ${formattedDate}`);

    await this.interviewDate.waitFor({
        state: "visible",
        timeout: 10000
    });

    await this.interviewDate.fill(formattedDate);

    console.log(
        `Interview date entered successfully: ${formattedDate}`
    );
}
    


    

    
async enterInterviewTime(time: string): Promise<void> {

   console.log(`Time received: ${time}`);

    const match = time.match(/^(\d{1,2}):(\d{2})(AM|PM)$/i);

    if (!match) {
        throw new Error(`Invalid time format: ${time}`);
    }

    let hour = Number(match[1]);
    const minute = match[2];
    const period = match[3].toUpperCase();

    if (period === "PM" && hour !== 12) {
        hour += 12;
    }

    if (period === "AM" && hour === 12) {
        hour = 0;
    }

    const formattedTime =
        `${String(hour).padStart(2, "0")}:${minute}`;

    console.log(`Time converted to: ${formattedTime}`);

    await this.interviewTime.waitFor({
        state: "visible",
        timeout: 10000
    });

    await this.interviewTime.click();

    await this.interviewTime.fill(formattedTime);

    console.log(
        `Interview time entered successfully: ${formattedTime}`
    );

    console.log(
        `Time field value: ${await this.interviewTime.inputValue()}`
    );
}



    
    async selectMeetingType(
        meetingType: string
    ): Promise<void> {

       console.log(">>> Starting Meeting Type");
    console.log("Value:", meetingType);

    await this.meetingTypeDropdown.waitFor({
        state: "visible",
        timeout: 10000
    });

    console.log("Meeting Type dropdown visible");

    await this.meetingTypeDropdown.selectOption({
        label: meetingType
    });

    console.log("Meeting Type selected");
}


   

    async selectInterviewType(
        interviewType: string
    ): Promise<void> {

         console.log(">>> Starting Interview Type");
    console.log("Value:", interviewType);

    await this.interviewTypeDropdown.waitFor({
        state: "visible",
        timeout: 10000
    });

    await this.interviewTypeDropdown.selectOption({
        label: interviewType
    });

    console.log("Interview Type selected");
}

    // ==============================
    // Duration
    // ==============================

    async selectDuration(
        duration: string
    ): Promise<void> {

       console.log(">>> Starting Duration");
    console.log("Value:", duration);

    await this.durationDropdown.waitFor({
        state: "visible",
        timeout: 10000
    });

    await this.durationDropdown.selectOption({
        label: duration
    });

    console.log("Duration selected");
}

    

    async enterNotes(
        notesText: string
    ): Promise<void> {

        await this.notes.fill(notesText);
    }


   

    async scheduleInterview(): Promise<void> {

        await this.page.getByRole("button", {
            name: /Schedule Interview/i
        }).last().click();
    }


   

    async verifyInterviewScheduled(): Promise<void> {

        await expect(
            this.page.getByRole("heading", {
                name: "Interviews"
            })
        ).toBeVisible();
        console.log("Interview scheduled");
    }
}