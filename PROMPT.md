I need to create a web app for the FMB admin functionality. I will provide extensive context below.

I want you to plan the work for me. Ask me questions for clarification.

Once the plan is complete, create a `todolist.md` file. Use check boxes and list all the tasks you need to complete. Make each task a tick box, put bullet points below it. Then, once completed, you can work down the task list one by one ticking them off.


Context: the FMB system has 3 sets of users: Mumineen, Admins, and me.

I am the main developer and super admin for the system. I control and own all apps, automations, deployments, and requirements.

All data for the FMB system is stored in the `fmbdb`. The `fmb-functions` is an API that is built on top of the the `fmbdb`. The API is written in Javascript and aims to provide a set of REST routes which will run custom SQL on the database to read and write data.

Mumineen interact with the FMB system using the `fmbmobile` mobile app which is written in Flutter and deployed to both IOS and Android.

Admins interact with the FMB system using the `fmb-ui` which is a web app which is accessible only by admins and is used to administer FMB process and distribution.

I need to create a new `fmb-ui` administration web app using Vue with Pinia and Naive UI. The web app will use the FMB API (spec can be found at ./fmb-functions/functions/docs/openapi.json).

The app will have the following requirements:
## Member management

1. View member list - include delete option
	1. API - view all members
		1. Input - no input
		2. Output - full household list, this API endpoint already exists?
	2. API - delete member by id
		1. Input - jamaat member id
		2. Output - success message
		3. Validation
			1. Cannot be head of household for a household
			2. Cannot be zone admin for a thaali zone
			3. Frontend can indicate this via refreshing the roles list
	3. API - mark inactive by id
		1. Input - jamaat member id
		2. Output - success message
		3. Validation
			1. Cannot be head of household for a household
			2. Cannot be zone admin for a thaali zone
			3. Frontend can indicate this via refreshing the roles list
2. Create member screen
	1. API - create member
		1. Input - ItsID, name (first/middle/last), phone, email, title, role
		2. Output - success message
		3. Validation
			1. ItsID must be unique, do a uniqueness check before inserting but also create a unique index on ItsID on JamaatMembers table to ensure this follows correctly always
			2. Sanitize inputs to ensure no poorly formatted or malicious input
3. Edit member screen
	1. API - edit member
		1. Input - jamaat member id (required), name (first/middle/last), phone, email, title, role
		2. Output - success message
		3. Validation
			1. Sanitize inputs to ensure no poorly formatted or malicious input
## Household management

1. !! View households list
	1. API - search for household
		1. Input - search string
		2. Output - list of households
2. !! View
	1. API - search for household
		1. Input - search string
		2. Output - list of households
3. !! View household screen
	1. View only screen showing data for household and thaali history
	2. API - get household by household id
		1. Input - household id
		2. Output - all household info, all members in household (expand role and relationship), fmb profile, fmb preferences, thaali container info
4. Create new household screen
	1. Note that a new household MUST have a member assigned as the head of household. That member cannot already by the head of household for another house
	2. Thaali assignment - for each day (Mon, Tues, Wed, Thurs, Sat, Sun), the user should be able to pick if they want a size A, B, C, or D thaali or opt out of thaali for that day. These will be saved as the default weekly preferences for this household
5. !! Edit household screen
	1. Address and contact info for home edit
	2. Assign/reassign primary contact for household
	3. Reassign head of household - show list of people with no household
	4. Delete member from household - this should not delete the member, just remove their household assignment
	5. Thaali assignment - for each day (Mon, Tues, Wed, Thurs, Sat, Sun), the user should be able to pick if they want a size A, B, C, or D thaali or opt out of thaali for that day. These will be saved as the default weekly preferences for this household
	6. API - edit household profile
		1. Input - household id (required), address info
		2. Output - success message
		3. Validation
			1. Sanitize inputs
	7. API - edit household thaali preferences
		1. Input - household id (required), json with new preferences will be used to replace all existing preferences
		2. Output - success message
	8. API - add member to household
		1. Input - household id (required), jamaat member id (required), relationship id (required)
		2. Output - success message
		3. Validation
			1. Member must not already be part of another household. First remove member from existing household
	9. API - remove member from household
		1. Input - household id (required), jamaat member id (required)
		2. Output - success message
		3. Validation
			1. Member cannot be head of household or the thaali contact
	10. API - update thaali contact
	11. API - update head of household screen
	1. View only screen showing data for household and thaali history
	2. API - get household by household id
		1. Input - household id
		2. Output - all household info, all members in household (expand role and relationship), fmb profile, fmb preferences, thaali container info
6. Create new household screen
	1. Note that a new household MUST have a member assigned as the head of household. That member cannot already by the head of household for another house
	2. Thaali assignment - for each day (Mon, Tues, Wed, Thurs, Sat, Sun), the user should be able to pick if they want a size A, B, C, or D thaali or opt out of thaali for that day. These will be saved as the default weekly preferences for this household
7. !! Edit household screen
	1. Address and contact info for home edit
	2. Assign/reassign primary contact for household
	3. Reassign head of household - show list of people with no household
	4. Delete member from household - this should not delete the member, just remove their household assignment
	5. Thaali assignment - for each day (Mon, Tues, Wed, Thurs, Sat, Sun), the user should be able to pick if they want a size A, B, C, or D thaali or opt out of thaali for that day. These will be saved as the default weekly preferences for this household
	6. API - edit household profile
		1. Input - household id (required), address info
		2. Output - success message
		3. Validation
			1. Sanitize inputs
	7. API - edit household thaali preferences
		1. Input - household id (required), json with new preferences will be used to replace all existing preferences
		2. Output - success message
	8. API - add member to household
		1. Input - household id (required), jamaat member id (required), relationship id (required)
		2. Output - success message
		3. Validation
			1. Member must not already be part of another household. First remove member from existing household
	9. API - remove member from household
		1. Input - household id (required), jamaat member id (required)
		2. Output - success message
		3. Validation
			1. Member cannot be head of household or the thaali contact
	10. API - update thaali contact
	11. API - update head of household
## Zone management

1. View zone list
	1. Note - no delete option, once a zone is created it will require reaching out to me to get it deleted.
2. View zone screen
	1. Show zone name and zone admin name
	2. Show list of households in the zone with their thaali number
	3. Add button to add a household to the zone - adding a household should update the zone for the household
	4. Edit zone admin, zone admin MUST be assigned, but same person can be admin of multiple zones
3. Create new zone - should be simple, just include name and zone admin. Adding households can be coordinated through the view zone screen
## Vendor Management

1. Vendor list screen
2. Create vendor - include just name and contact info
3. Vendor view - should show vendor contact info and list of menu items vendor can make
4. Menu item list
5. Create and edit menu item - make two screens, one for create and another for edit, but the screen should be largely the same in terms of fields to be filled out. Include name and vendor as required, and disallow duplicate name/vendor. Also include additional fields for notes, ingredients, and allergen info
6. Survey/menu rating - this screen will be a multi-tab screen with both a dashboard showing all menus and their ratings going backwards in time as well as the survey questionnaire configurations

## Menu Management

Notes on thaali filling - a filling date is the day that thaali filling happens. A menu is for a specific day and can have multiple menu items. Multiple menus can be filled on a single day, for example the filling for Monday can include the menu for both Monday and Tuesday

1. !! View all weekly menus - show list of current weeks’ menu and future weeks menus
2. !! Create weekly menu - this is likely one of the most complex screens
	1. Allow setting of weekly cutoff date and time
	2. There will be 6 days of menus each week: starting at Monday, Tuesday, Wednesday, Thursday, Saturday, and Sunday.
	3. Each menu will have a filling day associated to it. By default, the fill date for each menu will be the same as the date of the menu so there will be 6 distinct fill dates, but changing fill dates on menu should allow combining menus into a single fill date. There should be some sort of visual UI element when the menus from multiple fills are merged
	4. If a menu has no items, then select the ’No Thaali’ item
	5. Include a button to add Friday as a filling day (require a confirmation dialog for this)
3. !! Edit weekly menu - this is likely one of the most complex screens
	1. This screen needs to be create carefully because a week cannot be deleted once created
	2. Fill date and menu cannot be updated or changed if we’re past that day (i.e. we cannot change Monday’s filling on Wednesday but we can edit Saturday)
	3. Cannot change or delete fill days but menus can be moved from one fill date to another
	4. Menu items can be edited, added, or deleted
	5. Include a button to add Friday as a filling day (require a confirmation for this)
## Filling Management

A fill report can be generated after the cutoff for a week. Generating a fill report will capture a snapshot for the filling for that week which will include a record for every single individual who will be receiving a filled thaali. This fill report is generated for reporting as well as used as the finalized list for verification workflow. It is possible to regenerate the fill report, regenerating the fill report deletes the records that are there and generates a new snapshot.
Thaali preferences made after the fill report is generated will not affect the fill report, if that happens, the fill report will need to be regenerated.

1. !! Fill reports view all (with regenerate button)
	1. View list of all reports for past weeks
2. !! Fill report view
	1. Show list of individuals with their thaali number and thaali size for that given filling day
	2. Each individual thaali can also have a status, current list of statuses are: AVAILABLE, MISSING, FILLED, PICKED_UP, and UNKNOWN
		1. These statuses can be changed by the admins and there is an existing API call for this
	3. Thaali inventory
		1. Show a report of MISSING thaalis so individuals can be communicated
3. Thaali look up
	1. Basic search based on name or thaali number
	2. Should pull up household with full thaali history