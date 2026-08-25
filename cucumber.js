module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        requireModule: [
            "ts-node/register"
        ],
        require: [
            "src/test/world/**/*.ts",
            "src/test/hooks/**/*.ts",
            "src/test/Steps/**/*.ts",
           
        ],
        paths: [
            "src/test/feature/**/*.feature",
            "src/test/features/**/*.feature"
        ],
        publishQuiet: true,
        dryRun: false,
        format: [
            "progress",
            "json:reports/cucumber-json/cucumber-report.json",
            "html:reports/cucumber-html/cucumber-report.html",
            "rerun:rerun/rerun.txt"
        ],
        parallel: 1
    },

    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        requireModule: [
            "ts-node/register"
        ],
        require: [
            "src/test/world/**/*.ts",
            "src/test/hooks/**/*.ts",
            "src/test/Steps/**/*.ts",
            "src/test/stepdefinitions/**/*.ts"
        ],
        paths: [
            "rerun/rerun.txt"
        ],
        publishQuiet: true,
        dryRun: false,
        format: [
            "progress",
            "json:reports/cucumber-json/cucumber-report.json",
            "html:reports/cucumber-html/cucumber-report.html",
            "rerun:rerun/rerun.txt"
        ],
        parallel: 1
    }
};