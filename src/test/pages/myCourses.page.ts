import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../utils/logger";

export class MyCoursesPage extends BasePage {
    // Sidebar Navigation Locators
    readonly sidebarMyCoursesBtn: Locator;
    readonly sidebarCourseSubmenu: Locator;
    readonly sidebarReactCourseItem: Locator;
    readonly sidebarViewAllCoursesBtn: Locator;

    // Detail Header & Breadcrumb
    readonly breadcrumb: Locator;
    readonly backBtn: Locator;
    readonly statusBadge: Locator;
    readonly courseTitle: Locator;
    readonly courseCategory: Locator;
    readonly courseDescription: Locator;
    readonly moreOptionsBtn: Locator;

    // Course Stats
    readonly heroStatsContainer: Locator;
    readonly lessonsStat: Locator;
    readonly quizzesStat: Locator;
    readonly studentsStat: Locator;
    readonly codingStat: Locator;

    // Menu Tabs Toolbar
    readonly tabsList: Locator;
    readonly structureTab: Locator;
    readonly lessonsTab: Locator;
    readonly aiQuizTab: Locator;
    readonly codingTab: Locator;
    readonly discussionsTab: Locator;
    readonly resourcesTab: Locator;
    readonly certificatesTab: Locator;
    readonly progressTab: Locator;

    // Detail Content Area
    readonly detailContentWrapper: Locator;
    readonly detailContent: Locator;

    // Structure Tab Specific Elements
    readonly curriculumBannerTitle: Locator;
    readonly curriculumBannerDesc: Locator;
    readonly startLearningBtn: Locator;
    readonly courseOverviewTitle: Locator;
    readonly courseOverviewText: Locator;
    readonly instructorTitle: Locator;
    readonly instructorName: Locator;
    readonly instructorRole: Locator;

    constructor(page: Page) {
        super(page);

        // Sidebar Navigation
        this.sidebarMyCoursesBtn = page.locator(".wl-sidebar-item:has-text('My Courses')");
        this.sidebarCourseSubmenu = page.locator(".wl-sidebar-submenu-box");
        this.sidebarReactCourseItem = page.locator(".wl-sidebar-course-item:has-text('React'), button.wl-sidebar-course-item[title='React']");
        this.sidebarViewAllCoursesBtn = page.locator("button.wl-sidebar-view-all");

        // Detail Header & Hero
        this.breadcrumb = page.locator("nav.wl-detail-breadcrumb");
        this.backBtn = page.locator("button.wl-detail-back");
        this.statusBadge = page.locator(".wl-detail-status-badge");
        this.courseTitle = page.locator("h1.wl-detail-hero-title");
        this.courseCategory = page.locator(".wl-detail-hero-category");
        this.courseDescription = page.locator("p.wl-detail-hero-desc");
        this.moreOptionsBtn = page.locator("button.wl-detail-hero-more-btn");

        // Stats
        this.heroStatsContainer = page.locator(".wl-detail-hero-stats");
        this.lessonsStat = page.locator(".wl-detail-hero-stat:has-text('Lessons')");
        this.quizzesStat = page.locator(".wl-detail-hero-stat:has-text('Quizzes')");
        this.studentsStat = page.locator(".wl-detail-hero-stat:has-text('Students')");
        this.codingStat = page.locator(".wl-detail-hero-stat:has-text('Coding')");

        // Menu Tabs
        this.tabsList = page.locator(".wl-detail-tabs-list");
        this.structureTab = page.locator(".wl-detail-tab:has-text('Structure'), button[role='tab']:has-text('Structure')");
        this.lessonsTab = page.locator(".wl-detail-tab:has-text('Lessons'), button[role='tab']:has-text('Lessons')");
        this.aiQuizTab = page.locator(".wl-detail-tab:has-text('AI Quiz'), button[role='tab']:has-text('AI Quiz')");
        this.codingTab = page.locator(".wl-detail-tab:has-text('Coding'), button[role='tab']:has-text('Coding')");
        this.discussionsTab = page.locator(".wl-detail-tab:has-text('Discussions'), button[role='tab']:has-text('Discussions')");
        this.resourcesTab = page.locator(".wl-detail-tab:has-text('Resources'), button[role='tab']:has-text('Resources')");
        this.certificatesTab = page.locator(".wl-detail-tab:has-text('Certificates'), button[role='tab']:has-text('Certificates')");
        this.progressTab = page.locator(".wl-detail-tab:has-text('Progress'), button[role='tab']:has-text('Progress')");

        // Tab Content Area
        this.detailContentWrapper = page.locator(".wl-detail-content-wrapper");
        this.detailContent = page.locator(".wl-detail-content");

        // Structure Tab Components
        this.curriculumBannerTitle = page.locator(".wl-detail-content h3:has-text('Course Curriculum & Materials')");
        this.curriculumBannerDesc = page.locator(".wl-detail-content p:has-text('Explore structured lessons')");
        this.startLearningBtn = page.locator(".wl-detail-content button:has-text('Start Learning')");
        this.courseOverviewTitle = page.locator(".wl-detail-content h3:has-text('Course Overview')");
        this.courseOverviewText = page.locator(".wl-detail-content h3:has-text('Course Overview') + p");
        this.instructorTitle = page.locator(".wl-detail-content h3:has-text('Instructor')");
        this.instructorName = page.locator(".wl-detail-content div:has(> h3:text-is('Instructor')) div:has-text('sriram')").last();
        this.instructorRole = page.locator(".wl-detail-content div:has-text('Course Trainer')").first();
    }

    /**
     * Navigate to My Courses in Sidebar and select a specific course (default: React)
     */
    async navigateToCourse(courseName: string = "React"): Promise<void> {
        logger.info(`Navigating to My Courses and opening course: "${courseName}"`);

        // If sidebar course submenu is not open or not visible, click My Courses
        const isSubmenuVisible = await this.sidebarReactCourseItem.isVisible().catch(() => false);
        if (!isSubmenuVisible) {
            await this.click(this.sidebarMyCoursesBtn, "Sidebar 'My Courses' Item");
        }

        // Click the specific course in the submenu
        const courseItem = this.page.locator(`.wl-sidebar-course-item:has-text('${courseName}'), button.wl-sidebar-course-item[title='${courseName}']`).first();
        await this.click(courseItem, `Sidebar Course Item "${courseName}"`);

        // Wait for course details page to load
        await this.courseTitle.waitFor({ state: "visible", timeout: 15000 });
        logger.info(`Successfully navigated to course "${courseName}" details page`);
    }

    /**
     * Verify course details page header and course title
     */
    async verifyCourseTitle(expectedTitle: string): Promise<void> {
        logger.info(`Verifying course details title equals: "${expectedTitle}"`);
        await this.courseTitle.waitFor({ state: "visible", timeout: 15000 });
        const actualTitle = await this.courseTitle.textContent();
        expect(actualTitle?.trim()).toBe(expectedTitle);
    }

    /**
     * Get tab locator dynamically by name
     */
    getTabLocator(tabName: string): Locator {
        return this.page.locator(`.wl-detail-tab:has-text('${tabName}'), button[role='tab']:has-text('${tabName}')`).first();
    }

    /**
     * Click a specific course menu tab (Structure, Lessons, AI Quiz, Coding, Discussions, Resources, Certificates, Progress)
     */
    async clickMenuTab(tabName: string): Promise<void> {
        logger.info(`Clicking on course menu tab: "${tabName}"`);
        const tabLocator = this.getTabLocator(tabName);
        await this.click(tabLocator, `Menu Tab "${tabName}"`);
        await this.page.waitForTimeout(400); // allow UI animation/transition to settle
    }

    /**
     * Verify tab is currently marked active (has active class or aria-selected='true')
     */
    async verifyTabIsActive(tabName: string): Promise<void> {
        logger.info(`Verifying menu tab "${tabName}" is active`);
        const tabLocator = this.getTabLocator(tabName);
        await tabLocator.waitFor({ state: "visible", timeout: 10000 });

        const isClassActive = await tabLocator.evaluate((el: HTMLElement) => el.classList.contains("wl-detail-tab--active"));
        const isAriaSelected = await tabLocator.getAttribute("aria-selected");

        const isActive = isClassActive || isAriaSelected === "true";
        logger.info(`Tab "${tabName}" active state - Class: ${isClassActive}, aria-selected: ${isAriaSelected}`);
        expect(isActive, `Expected menu tab "${tabName}" to be active`).toBe(true);
    }

    /**
     * Verify Structure tab content (Curriculum header, Start learning button, Instructor)
     */
    async verifyStructureContent(expectedCurriculumHeader: string = "Course Curriculum & Materials", expectedInstructor: string = "sriram"): Promise<void> {
        logger.info("Verifying Structure menu tab content details");

        await this.curriculumBannerTitle.waitFor({ state: "visible", timeout: 10000 });
        const bannerText = await this.curriculumBannerTitle.textContent();
        expect(bannerText?.trim()).toContain(expectedCurriculumHeader);

        await expect(this.startLearningBtn).toBeVisible();

        const instructorSection = this.page.locator(".wl-detail-content").filter({ hasText: expectedInstructor });
        await expect(instructorSection).toBeVisible();
        logger.info("Structure menu tab details verified successfully");
    }

    /**
     * Verify Start Learning button is visible and enabled
     */
    async verifyStartLearningButton(): Promise<void> {
        logger.info("Verifying 'Start Learning' button is visible and enabled");
        await expect(this.startLearningBtn).toBeVisible();
        await expect(this.startLearningBtn).toBeEnabled();
    }

    /**
     * Verify tab content section is loaded for any tab
     */
    async verifyTabContentLoaded(tabName: string): Promise<void> {
        logger.info(`Verifying content section is loaded and visible for tab: "${tabName}"`);
        await this.detailContentWrapper.waitFor({ state: "visible", timeout: 10000 });
        await expect(this.detailContent).toBeVisible();
        logger.info(`Content section for tab "${tabName}" is displayed properly`);
    }

    /**
     * Verify all expected menu tabs exist on the page
     */
    async verifyAllMenuTabsExist(expectedTabs: string[]): Promise<void> {
        logger.info(`Verifying existence of ${expectedTabs.length} menu tabs: ${expectedTabs.join(", ")}`);
        for (const tab of expectedTabs) {
            const tabLocator = this.getTabLocator(tab);
            await expect(tabLocator, `Expected menu tab "${tab}" to be visible`).toBeVisible();
        }
        logger.info("All menu tabs are present in the toolbar");
    }

    /**
     * Verify course hero stats
     */
    async verifyHeroStats(lessons: string, quizzes: string, students: string, coding: string): Promise<void> {
        logger.info(`Verifying course hero stats - Lessons: ${lessons}, Quizzes: ${quizzes}, Students: ${students}, Coding: ${coding}`);
        await expect(this.lessonsStat).toContainText(lessons);
        await expect(this.quizzesStat).toContainText(quizzes);
        await expect(this.studentsStat).toContainText(students);
        await expect(this.codingStat).toContainText(coding);
    }
}

export default MyCoursesPage;
