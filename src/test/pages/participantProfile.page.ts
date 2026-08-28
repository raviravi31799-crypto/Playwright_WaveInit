import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../utils/logger";
import path from "path";
import fs from "fs";

export class ParticipantProfilePage extends BasePage {
    // Navigation & Header
    readonly sidebarProfileBtn: Locator;
    readonly sidebarDashboardBtn: Locator;
    readonly pageTitle: Locator;
    readonly pageSubtitle: Locator;
    readonly backToDashboardBtn: Locator;
    readonly editProfileBtn: Locator;

    // Profile Photo & Upload Locators
    readonly updateProfilePhotoBtn: Locator;
    readonly fileInput: Locator;
    readonly avatarContainer: Locator;
    readonly uploadResumeBtn: Locator;

    // Profile Summary Card
    readonly profileName: Locator;
    readonly participantRoleBadge: Locator;
    readonly participantIdSummary: Locator;
    readonly enrolledTrainingsSummary: Locator;
    readonly accountStatusSummary: Locator;

    // Profile Completion Widget
    readonly profileCompletionCard: Locator;
    readonly completionPercentage: Locator;
    readonly completionSectionsText: Locator;

    // Learning Activity Heatmap
    readonly heatmapCard: Locator;
    readonly heatmapTitle: Locator;
    readonly heatmapTimeframeDropdown: Locator;
    readonly heatmapLegendNoActivity: Locator;
    readonly heatmapLegendLowActivity: Locator;
    readonly heatmapLegendMediumActivity: Locator;
    readonly heatmapLegendHighActivity: Locator;

    // Activity Summary (Last 90 Days)
    readonly activitySummaryCard: Locator;
    readonly activitySummaryTitle: Locator;
    readonly daysActiveValue: Locator;
    readonly coursesAccessedValue: Locator;
    readonly lessonsCompletedValue: Locator;
    readonly assessmentsTakenValue: Locator;
    readonly timeSpentLearningValue: Locator;
    readonly viewDetailedAnalyticsBtn: Locator;

    // Personal Information Card
    readonly personalInfoCard: Locator;
    readonly personalInfoEditBtn: Locator;
    readonly fullNameValue: Locator;
    readonly emailAddressValue: Locator;
    readonly phoneNumberValue: Locator;
    readonly personalParticipantIdValue: Locator;
    readonly departmentValue: Locator;
    readonly designationValue: Locator;
    readonly accountStatusValue: Locator;

    // Professional Information Card
    readonly professionalInfoCard: Locator;
    readonly companyValue: Locator;
    readonly professionalHeadlineValue: Locator;
    readonly locationValue: Locator;

    // Skills Card
    readonly skillsCard: Locator;
    readonly addSkillBtn: Locator;

    constructor(page: Page) {
        super(page);

        // Sidebar Navigation
        this.sidebarProfileBtn = page.locator(".wl-sidebar-item:has-text('Profile')");
        this.sidebarDashboardBtn = page.locator(".wl-sidebar-item:has-text('Dashboard')");

        // Page Header
        this.pageTitle = page.locator("h2.reg-admin-title");
        this.pageSubtitle = page.locator("p.reg-admin-subtitle");
        this.backToDashboardBtn = page.locator("button.reg-admin-btn:has-text('Back to Dashboard')");
        this.editProfileBtn = page.locator("button.reg-admin-btn--primary:has-text('Edit Profile')");

        // Profile Photo & Upload
        this.updateProfilePhotoBtn = page.locator("button[title='Update Profile Photo'], button:has(svg.lucide-camera)");
        this.fileInput = page.locator("input[type='file']");
        this.avatarContainer = page.locator(".reg-admin-header ~ div div:has(> div:has-text('SR'))").first();
        this.uploadResumeBtn = page.locator("button:has-text('Upload Resume'), button:has-text('+ Upload Resume')");

        // Profile Top Summary
        this.profileName = page.locator(".reg-admin h3");
        this.participantRoleBadge = page.locator(".reg-admin span.reg-admin-status:has-text('PARTICIPANT')");
        this.participantIdSummary = page.locator("div:has(> span:text-is('Participant ID')) span:nth-child(2)").first();
        this.enrolledTrainingsSummary = page.locator("div:has(> span:text-is('Enrolled Trainings')) span:nth-child(2)");
        this.accountStatusSummary = page.locator("div:has(> span:text-is('Account Status')) span.reg-admin-status").first();

        // Profile Completion Widget
        this.profileCompletionCard = page.locator(".profile-activity-container > div").nth(0);
        this.completionPercentage = this.profileCompletionCard.locator("div").filter({ hasText: /^\s*\d+%\s*$/ }).first();
        this.completionSectionsText = this.profileCompletionCard.locator("div:has-text('Sections Complete')");

        // Heatmap
        this.heatmapCard = page.locator(".profile-activity-container > div").nth(1);
        this.heatmapTitle = this.heatmapCard.locator("h4:has-text('Learning Activity Heatmap')");
        this.heatmapTimeframeDropdown = this.heatmapCard.locator("select");
        this.heatmapLegendNoActivity = this.heatmapCard.locator("span:has-text('No Activity')");
        this.heatmapLegendLowActivity = this.heatmapCard.locator("span:has-text('Low Activity')");
        this.heatmapLegendMediumActivity = this.heatmapCard.locator("span:has-text('Medium Activity')");
        this.heatmapLegendHighActivity = this.heatmapCard.locator("span:has-text('High Activity')");

        // Activity Summary Card
        this.activitySummaryCard = page.locator(".profile-activity-container > div").nth(2);
        this.activitySummaryTitle = this.activitySummaryCard.locator("h4:has-text('Activity Summary')");
        this.daysActiveValue = this.activitySummaryCard.locator("div:has(> div > span:text-is('Days Active')) > span:last-child");
        this.coursesAccessedValue = this.activitySummaryCard.locator("div:has(> div > span:text-is('Courses Accessed')) > span:last-child");
        this.lessonsCompletedValue = this.activitySummaryCard.locator("div:has(> div > span:text-is('Lessons Completed')) > span:last-child");
        this.assessmentsTakenValue = this.activitySummaryCard.locator("div:has(> div > span:text-is('Assessments Taken')) > span:last-child");
        this.timeSpentLearningValue = this.activitySummaryCard.locator("div:has(> div > span:text-is('Time Spent Learning')) > span:last-child");
        this.viewDetailedAnalyticsBtn = this.activitySummaryCard.locator("button:has-text('View Detailed Analytics')");

        // Personal Information Card
        this.personalInfoCard = page.locator(".reg-admin-table-wrap:has(.reg-card-title:has-text('Personal Information'))");
        this.personalInfoEditBtn = this.personalInfoCard.locator("button:has-text('Edit')");
        this.fullNameValue = this.personalInfoCard.locator("div:has(> span:text-is('Full Name')) span:last-child");
        this.emailAddressValue = this.personalInfoCard.locator("div:has(> span:text-is('Email Address')) span:last-child");
        this.phoneNumberValue = this.personalInfoCard.locator("div:has(> span:text-is('Phone Number')) span:last-child");
        this.personalParticipantIdValue = this.personalInfoCard.locator("div:has(> span:text-is('Participant ID')) span:last-child");
        this.departmentValue = this.personalInfoCard.locator("div:has(> span:text-is('Department')) span:last-child");
        this.designationValue = this.personalInfoCard.locator("div:has(> span:text-is('Designation')) span:last-child");
        this.accountStatusValue = this.personalInfoCard.locator("div:has(> span:text-is('Account Status')) span.reg-admin-status");

        // Professional Information Card
        this.professionalInfoCard = page.locator(".reg-admin-table-wrap:has(.reg-card-title:has-text('Professional Information'))");
        this.companyValue = this.professionalInfoCard.locator("div:has(> span:text-is('Company / Org')) span:last-child");
        this.professionalHeadlineValue = this.professionalInfoCard.locator("div:has(> span:text-is('Professional Headline')) span:last-child");
        this.locationValue = this.professionalInfoCard.locator("div:has(> span:text-is('Location')) span:last-child");

        // Skills Card
        this.skillsCard = page.locator(".reg-admin-table-wrap:has(.reg-card-title:has-text('Skills'))");
        this.addSkillBtn = this.skillsCard.locator("button:has-text('Add Skill')");
    }

    /**
     * Navigate to Profile page via sidebar navigation
     */
    async navigateToProfile(): Promise<void> {
        logger.info("Navigating to Participant Profile page via sidebar");
        await this.click(this.sidebarProfileBtn, "Sidebar Profile Item");
        await this.pageTitle.waitFor({ state: "visible", timeout: 10000 });
    }

    /**
     * Verify Profile Page Header title and subtitle
     */
    async verifyProfileHeader(expectedTitle: string = "My Profile"): Promise<void> {
        logger.info(`Verifying Profile Page title is: "${expectedTitle}"`);
        await this.pageTitle.waitFor({ state: "visible", timeout: 10000 });
        const titleText = await this.pageTitle.textContent();
        expect(titleText?.trim()).toContain(expectedTitle);
    }

    /**
     * Verify Personal Information details in the card
     */
    async verifyPersonalInformation(expected: {
        fullName?: string;
        email?: string;
        phone?: string;
        participantId?: string;
        department?: string;
        designation?: string;
        accountStatus?: string;
    }): Promise<void> {
        logger.info("Verifying Personal Information card details");
        await this.personalInfoCard.waitFor({ state: "visible", timeout: 10000 });

        if (expected.fullName) {
            const actualName = await this.fullNameValue.textContent();
            logger.info(`Personal Info - Full Name: "${actualName?.trim()}"`);
            expect(actualName?.trim()).toBe(expected.fullName);
        }

        if (expected.email) {
            const actualEmail = await this.emailAddressValue.textContent();
            logger.info(`Personal Info - Email Address: "${actualEmail?.trim()}"`);
            expect(actualEmail?.trim()).toContain(expected.email);
        }

        if (expected.phone) {
            const actualPhone = await this.phoneNumberValue.textContent();
            logger.info(`Personal Info - Phone Number: "${actualPhone?.trim()}"`);
            expect(actualPhone?.trim()).toBe(expected.phone);
        }

        if (expected.participantId) {
            const actualId = await this.personalParticipantIdValue.textContent();
            logger.info(`Personal Info - Participant ID: "${actualId?.trim()}"`);
            expect(actualId?.trim()).toBe(expected.participantId);
        }

        if (expected.department) {
            const actualDept = await this.departmentValue.textContent();
            logger.info(`Personal Info - Department: "${actualDept?.trim()}"`);
            expect(actualDept?.trim()).toBe(expected.department);
        }

        if (expected.designation) {
            const actualDesig = await this.designationValue.textContent();
            logger.info(`Personal Info - Designation: "${actualDesig?.trim()}"`);
            expect(actualDesig?.trim()).toBe(expected.designation);
        }

        if (expected.accountStatus) {
            const actualStatus = await this.accountStatusValue.textContent();
            logger.info(`Personal Info - Account Status: "${actualStatus?.trim()}"`);
            expect(actualStatus?.trim()).toBe(expected.accountStatus);
        }
    }

    /**
     * Verify Activity Summary Metrics
     */
    async verifyActivitySummary(expected: {
        timeframe?: string;
        daysActive?: string;
        coursesAccessed?: string;
        lessonsCompleted?: string;
        assessmentsTaken?: string;
        timeSpentLearning?: string;
    }): Promise<void> {
        logger.info("Verifying Activity Summary metrics");
        await this.activitySummaryCard.waitFor({ state: "visible", timeout: 10000 });

        if (expected.timeframe) {
            const actualTitle = await this.activitySummaryTitle.textContent();
            logger.info(`Activity Summary Header: "${actualTitle?.trim()}"`);
            expect(actualTitle?.trim()).toContain(expected.timeframe);
        }

        if (expected.daysActive) {
            const actualDays = await this.daysActiveValue.textContent();
            logger.info(`Days Active: "${actualDays?.trim()}"`);
            const num = parseInt(actualDays?.trim() || "0", 10);
            const exp = parseInt(expected.daysActive, 10);
            if (!isNaN(num) && !isNaN(exp)) {
                expect(num).toBeGreaterThanOrEqual(exp);
            } else {
                expect(actualDays?.trim()).toBe(expected.daysActive);
            }
        }

        if (expected.coursesAccessed) {
            const actualCourses = await this.coursesAccessedValue.textContent();
            logger.info(`Courses Accessed: "${actualCourses?.trim()}"`);
            const num = parseInt(actualCourses?.trim() || "0", 10);
            const exp = parseInt(expected.coursesAccessed, 10);
            if (!isNaN(num) && !isNaN(exp)) {
                expect(num).toBeGreaterThanOrEqual(exp);
            } else {
                expect(actualCourses?.trim()).toBe(expected.coursesAccessed);
            }
        }

        if (expected.lessonsCompleted) {
            const actualLessons = await this.lessonsCompletedValue.textContent();
            logger.info(`Lessons Completed: "${actualLessons?.trim()}"`);
            const num = parseInt(actualLessons?.trim() || "0", 10);
            const exp = parseInt(expected.lessonsCompleted, 10);
            if (!isNaN(num) && !isNaN(exp)) {
                expect(num).toBeGreaterThanOrEqual(exp);
            } else {
                expect(actualLessons?.trim()).toBe(expected.lessonsCompleted);
            }
        }

        if (expected.assessmentsTaken) {
            const actualAssessments = await this.assessmentsTakenValue.textContent();
            logger.info(`Assessments Taken: "${actualAssessments?.trim()}"`);
            const num = parseInt(actualAssessments?.trim() || "0", 10);
            const exp = parseInt(expected.assessmentsTaken, 10);
            if (!isNaN(num) && !isNaN(exp)) {
                expect(num).toBeGreaterThanOrEqual(exp);
            } else {
                expect(actualAssessments?.trim()).toBe(expected.assessmentsTaken);
            }
        }

        if (expected.timeSpentLearning) {
            const actualTime = await this.timeSpentLearningValue.textContent();
            logger.info(`Time Spent Learning: "${actualTime?.trim()}"`);
            expect(actualTime?.trim()).toMatch(/\d+h\s*\d+m/);
        }
    }

    /**
     * Verify Learning Activity Heatmap is visible and options
     */
    async verifyLearningActivityHeatmap(): Promise<void> {
        logger.info("Verifying Learning Activity Heatmap display and legend");
        await this.heatmapCard.waitFor({ state: "visible", timeout: 10000 });
        await expect(this.heatmapTitle).toBeVisible();
        await expect(this.heatmapTimeframeDropdown).toBeVisible();
        await expect(this.heatmapLegendNoActivity).toBeVisible();
        await expect(this.heatmapLegendLowActivity).toBeVisible();
        await expect(this.heatmapLegendMediumActivity).toBeVisible();
        await expect(this.heatmapLegendHighActivity).toBeVisible();
    }

    /**
     * Select a timeframe in the Heatmap dropdown
     */
    async selectHeatmapTimeframe(timeframeOption: string): Promise<void> {
        logger.info(`Selecting heatmap timeframe: "${timeframeOption}"`);
        await this.heatmapTimeframeDropdown.waitFor({ state: "visible", timeout: 10000 });
        await this.heatmapTimeframeDropdown.selectOption({ label: timeframeOption });
    }

    /**
     * Verify available options in the Heatmap timeframe dropdown
     */
    async verifyHeatmapTimeframeOptions(expectedOptions: string[]): Promise<void> {
        logger.info(`Verifying heatmap timeframe dropdown options: ${expectedOptions.join(", ")}`);
        const options = await this.heatmapTimeframeDropdown.locator("option").allTextContents();
        const cleanedOptions = options.map(opt => opt.trim());
        for (const expectedOpt of expectedOptions) {
            expect(cleanedOptions).toContain(expectedOpt);
        }
    }

    /**
     * Verify Profile Completion widget
     */
    async verifyProfileCompletion(expectedPercentage: string = "63%", expectedSections?: string): Promise<void> {
        logger.info(`Verifying Profile Completion is "${expectedPercentage}"`);
        await this.profileCompletionCard.waitFor({ state: "visible", timeout: 10000 });
        const actualPercentage = await this.completionPercentage.textContent();
        expect(actualPercentage?.trim()).toContain(expectedPercentage);

        if (expectedSections) {
            const actualSections = await this.completionSectionsText.textContent();
            expect(actualSections?.trim()).toContain(expectedSections);
        }
    }

    /**
     * Click Back to Dashboard button
     */
    async clickBackToDashboard(): Promise<void> {
        logger.info("Clicking Back to Dashboard button");
        await this.click(this.backToDashboardBtn, "Back to Dashboard Button");
    }

    /**
     * Click View Detailed Analytics button
     */
    async clickDetailedAnalytics(): Promise<void> {
        logger.info("Clicking View Detailed Analytics button");
        await this.click(this.viewDetailedAnalyticsBtn, "View Detailed Analytics Button");
    }

    /**
     * Upload Profile Photo from testdata or given path
     */
    async uploadProfilePhoto(relativeOrAbsolutePath: string = "testdata/1T2A9487.jpg.jpeg"): Promise<void> {
        const resolvedPath = path.isAbsolute(relativeOrAbsolutePath)
            ? relativeOrAbsolutePath
            : path.resolve(process.cwd(), relativeOrAbsolutePath);

        logger.info(`Uploading profile photo from: ${resolvedPath}`);

        if (!fs.existsSync(resolvedPath)) {
            throw new Error(`Profile photo file does not exist at: ${resolvedPath}`);
        }

        // Check if an input[type='file'] is present in the DOM
        const inputCount = await this.fileInput.count();
        if (inputCount > 0) {
            await this.fileInput.first().setInputFiles(resolvedPath);
            logger.info("Directly set input files on input[type='file']");
        } else {
            // Click camera button and handle file chooser dialog
            logger.info("Triggering file chooser via camera button");
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent("filechooser", { timeout: 7000 }).catch(() => null),
                this.click(this.updateProfilePhotoBtn, "Update Profile Photo Camera Button")
            ]);

            if (fileChooser) {
                await fileChooser.setFiles(resolvedPath);
                logger.info("Set files via file chooser dialog");
            } else {
                // Try finding file input if created on demand
                await this.fileInput.first().setInputFiles(resolvedPath);
            }
        }

        // Wait brief moment for UI update
        await this.page.waitForTimeout(1000);
        logger.info(`✓ Profile photo successfully uploaded from: ${resolvedPath}`);
    }

    /**
     * Upload Resume from testdata or given path
     */
    async uploadResume(relativeOrAbsolutePath: string): Promise<void> {
        const resolvedPath = path.isAbsolute(relativeOrAbsolutePath)
            ? relativeOrAbsolutePath
            : path.resolve(process.cwd(), relativeOrAbsolutePath);

        logger.info(`Uploading resume from: ${resolvedPath}`);

        if (!fs.existsSync(resolvedPath)) {
            throw new Error(`Resume file does not exist at: ${resolvedPath}`);
        }

        const inputCount = await this.fileInput.count();
        if (inputCount > 0) {
            await this.fileInput.last().setInputFiles(resolvedPath);
        } else {
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent("filechooser", { timeout: 7000 }).catch(() => null),
                this.click(this.uploadResumeBtn.first(), "Upload Resume Button")
            ]);

            if (fileChooser) {
                await fileChooser.setFiles(resolvedPath);
            } else {
                await this.fileInput.last().setInputFiles(resolvedPath);
            }
        }

        await this.page.waitForTimeout(1000);
        logger.info(`✓ Resume file successfully uploaded from: ${resolvedPath}`);
    }
}

export default ParticipantProfilePage;

